import { App as AntdApp, ConfigProvider } from "antd";
import type { AppProps as AntdAppProps } from "antd/es/app";
import type { ConfigProviderProps, ThemeConfig } from "antd/es/config-provider";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  WorkbenchAppearance,
  WorkbenchAppearancePatch,
  WorkbenchResolvedThemeMode,
  WorkbenchThemeMode,
} from "../appearance/model";
import { normalizeWorkbenchAppearance } from "../appearance/normalize";
import { resolveInitialAppearance, writeStoredAppearance } from "../appearance/storage";
import { WorkbenchLocaleContext } from "../locale/context";
import type {
  WorkbenchLocaleContextValue,
  WorkbenchLocaleOption,
  WorkbenchLocaleOptions,
} from "../locale/model";
import { readStoredLocale, writeStoredLocale } from "../locale/storage";
import { createWorkbenchTheme } from "../theme/antd";
import { createWorkbenchCssVars } from "../theme/cssVars";
import type { WorkbenchPalette } from "../theme/model";
import { createWorkbenchPalette } from "../theme/palette";

export interface WorkbenchAppearanceProviderOptions {
  defaultValue?: WorkbenchAppearancePatch;
  rootElement?: HTMLElement | null;
  storageKey?: false | string;
  onChange?(appearance: WorkbenchAppearance): void;
}

export interface WorkbenchAntdProviderOptions {
  app?: boolean | Omit<AntdAppProps, "children">;
  config?: Omit<ConfigProviderProps, "children" | "locale" | "theme">;
  locale?: ConfigProviderProps["locale"];
  mergeTheme?: boolean;
  theme?: ThemeConfig;
}

export interface WorkbenchProviderProps {
  antd?: WorkbenchAntdProviderOptions;
  appearance?: WorkbenchAppearanceProviderOptions;
  children: ReactNode;
  locale?: WorkbenchLocaleOptions;
  withAntdApp?: boolean;
}

export interface WorkbenchAppearanceContextValue {
  appearance: WorkbenchAppearance;
  defaultAppearance: WorkbenchAppearance;
  palette: WorkbenchPalette;
  patchAppearance(patch: WorkbenchAppearancePatch): void;
  resetAppearance(): void;
  resolvedMode: WorkbenchResolvedThemeMode;
  setAppearance(appearance: WorkbenchAppearancePatch): void;
  setThemeMode(themeMode: WorkbenchThemeMode): void;
  toggleThemeMode(): void;
}

const WorkbenchAppearanceContext = createContext<WorkbenchAppearanceContextValue | null>(null);

export function WorkbenchProvider({
  antd,
  appearance: appearanceOptions,
  children,
  locale: localeOptions,
  withAntdApp = true,
}: WorkbenchProviderProps) {
  const storageKey = appearanceOptions?.storageKey ?? "workbench.appearance";
  const rootElement = appearanceOptions?.rootElement;
  const localeStorageKey = localeOptions?.storageKey ?? "workbench.locale";
  const defaultLocale = localeOptions?.defaultValue ?? localeOptions?.options?.[0]?.value ?? "";
  const localeControlled = localeOptions?.value !== undefined;
  const resolvedDefaultAppearance = useMemo(
    () => normalizeWorkbenchAppearance(appearanceOptions?.defaultValue),
    [appearanceOptions?.defaultValue],
  );
  const [appearance, setLocalAppearance] = useState<WorkbenchAppearance>(() =>
    resolveInitialAppearance(resolvedDefaultAppearance, storageKey),
  );
  const [localLocale, setLocalLocale] = useState<string>(
    () => localeOptions?.value ?? readStoredLocale(localeStorageKey) ?? defaultLocale,
  );
  const [systemMode, setSystemMode] = useState<WorkbenchResolvedThemeMode>(getSystemThemeMode);
  const resolvedMode = resolveWorkbenchThemeMode(appearance.mode, systemMode);
  const locale = localeControlled ? localeOptions.value ?? "" : localLocale;
  const localeOption = localeOptions?.options?.find((option) => option.value === locale);
  const antdLocale = antd?.locale ?? localeOption?.antdLocale ?? localeOptions?.antdLocale;
  const palette = useMemo(
    () => createWorkbenchPalette(appearance, resolvedMode),
    [appearance, resolvedMode],
  );
  const baseAntdTheme = useMemo(
    () => createWorkbenchTheme(appearance, palette, resolvedMode),
    [appearance, palette, resolvedMode],
  );
  const antdTheme = useMemo(
    () =>
      antd?.theme && antd.mergeTheme !== false
        ? mergeThemeConfig(baseAntdTheme, antd.theme)
        : antd?.theme ?? baseAntdTheme,
    [antd?.mergeTheme, antd?.theme, baseAntdTheme],
  );

  const setLocale = useMemo(
    () => (nextLocale: string) => {
      if (localeControlled) {
        localeOptions.onChange?.(nextLocale);
        return;
      }

      setLocalLocale(nextLocale);
    },
    [localeControlled, localeOptions],
  );

  const localeContextValue = useMemo<WorkbenchLocaleContextValue>(
    () => ({
      antdLocale,
      locale,
      options: localeOptions?.options ?? [],
      setLocale,
      toggleLocale() {
        const options = localeOptions?.options ?? [];
        if (options.length === 0) {
          return;
        }

        const currentIndex = Math.max(
          0,
          options.findIndex((option) => option.value === locale),
        );
        const next = options[(currentIndex + 1) % options.length];
        setLocale(next.value);
      },
    }),
    [antdLocale, locale, localeOptions?.options, setLocale],
  );

  const contextValue = useMemo<WorkbenchAppearanceContextValue>(
    () => ({
      appearance,
      defaultAppearance: resolvedDefaultAppearance,
      palette,
      patchAppearance(patch) {
        setLocalAppearance((current) => normalizeWorkbenchAppearance({ ...current, ...patch }));
      },
      resetAppearance() {
        setLocalAppearance(resolvedDefaultAppearance);
      },
      resolvedMode,
      setAppearance(nextAppearance) {
        setLocalAppearance(normalizeWorkbenchAppearance(nextAppearance));
      },
      setThemeMode(themeMode) {
        setLocalAppearance((current) => normalizeWorkbenchAppearance({ ...current, mode: themeMode }));
      },
      toggleThemeMode() {
        setLocalAppearance((current) =>
          normalizeWorkbenchAppearance({
            ...current,
            mode: resolveWorkbenchThemeMode(current.mode, systemMode) === "dark" ? "light" : "dark",
          }),
        );
      },
    }),
    [appearance, palette, resolvedDefaultAppearance, resolvedMode, systemMode],
  );

  useEffect(() => {
    const query = globalThis.matchMedia?.("(prefers-color-scheme: dark)");
    if (!query) {
      return;
    }

    const handleChange = () => {
      setSystemMode(query.matches ? "dark" : "light");
    };

    handleChange();
    query.addEventListener("change", handleChange);

    return () => {
      query.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    writeStoredAppearance(storageKey, appearance);
    appearanceOptions?.onChange?.(appearance);
  }, [appearance, appearanceOptions, storageKey]);

  useEffect(() => {
    writeStoredLocale(localeStorageKey, locale);
    if (!localeControlled) {
      localeOptions?.onChange?.(locale);
    }
  }, [locale, localeControlled, localeOptions?.onChange, localeStorageKey]);

  useEffect(() => {
    const target = rootElement ?? globalThis.document?.documentElement;
    if (!target || !locale) {
      return;
    }

    const previousLang = target.getAttribute("lang");
    target.setAttribute("data-workbench-locale", locale);
    const documentLang = resolveDocumentLang(locale, localeOption, localeOptions);
    if (documentLang) {
      target.setAttribute("lang", documentLang);
    }

    return () => {
      target.removeAttribute("data-workbench-locale");
      if (previousLang) {
        target.setAttribute("lang", previousLang);
      } else {
        target.removeAttribute("lang");
      }
    };
  }, [locale, localeOption, localeOptions, rootElement]);

  useEffect(() => {
    const target = rootElement ?? globalThis.document?.documentElement;
    if (!target) {
      return;
    }

    target.setAttribute("data-workbench-mode", appearance.mode);
    target.setAttribute("data-workbench-theme", resolvedMode);
    target.setAttribute("data-workbench-density", appearance.density);

    const cssVars = createWorkbenchCssVars(palette);
    Object.entries(cssVars).forEach(([name, value]) => {
      target.style.setProperty(name, value);
    });
    target.style.setProperty("--wb-control-radius", `${appearance.radius}px`);

    return () => {
      target.removeAttribute("data-workbench-density");
      target.removeAttribute("data-workbench-mode");
      target.removeAttribute("data-workbench-theme");
      Object.keys(cssVars).forEach((name) => {
        target.style.removeProperty(name);
      });
      target.style.removeProperty("--wb-control-radius");
    };
  }, [appearance.density, appearance.mode, appearance.radius, palette, resolvedMode, rootElement]);

  const appOption = antd?.app ?? withAntdApp;
  const appProps = typeof appOption === "object" ? appOption : {};
  const content = appOption ? (
    <AntdApp component="div" {...appProps}>
      {children}
    </AntdApp>
  ) : (
    children
  );

  return (
    <WorkbenchAppearanceContext value={contextValue}>
      <WorkbenchLocaleContext value={localeContextValue}>
        <ConfigProvider {...antd?.config} locale={antdLocale} theme={antdTheme}>
          {content}
        </ConfigProvider>
      </WorkbenchLocaleContext>
    </WorkbenchAppearanceContext>
  );
}

export function useWorkbenchAppearance(): WorkbenchAppearanceContextValue {
  const context = useContext(WorkbenchAppearanceContext);

  if (!context) {
    throw new Error("useWorkbenchAppearance must be used within WorkbenchProvider.");
  }

  return context;
}

export function resolveWorkbenchThemeMode(
  mode: WorkbenchThemeMode,
  systemMode: WorkbenchResolvedThemeMode = "dark",
): WorkbenchResolvedThemeMode {
  return mode === "system" ? systemMode : mode;
}

function getSystemThemeMode(): WorkbenchResolvedThemeMode {
  return globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function mergeThemeConfig(baseTheme: ThemeConfig, overrideTheme: ThemeConfig): ThemeConfig {
  return {
    ...baseTheme,
    ...overrideTheme,
    components: {
      ...baseTheme.components,
      ...overrideTheme.components,
    },
    token: {
      ...baseTheme.token,
      ...overrideTheme.token,
    },
  };
}

function resolveDocumentLang(
  locale: string,
  option: WorkbenchLocaleOption | undefined,
  options: WorkbenchLocaleOptions | undefined,
): string | undefined {
  if (typeof options?.documentLang === "function") {
    return options.documentLang(locale);
  }

  return options?.documentLang ?? option?.documentLang;
}
