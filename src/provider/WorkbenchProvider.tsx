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
import { workbenchLocales } from "../locale/messages";
import type { WorkbenchLocale, WorkbenchLocaleContextValue } from "../locale/model";
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
  mergeTheme?: boolean;
  theme?: ThemeConfig;
}

export interface WorkbenchProviderProps {
  antd?: WorkbenchAntdProviderOptions;
  appearance?: WorkbenchAppearanceProviderOptions;
  children: ReactNode;
  defaultLocale?: WorkbenchLocale;
  locale?: WorkbenchLocale;
  localeStorageKey?: false | string;
  withAntdApp?: boolean;
  onLocaleChange?(locale: WorkbenchLocale): void;
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
  defaultLocale = "zh-CN",
  locale: controlledLocale,
  localeStorageKey = "workbench.locale",
  withAntdApp = true,
  onLocaleChange,
}: WorkbenchProviderProps) {
  const storageKey = appearanceOptions?.storageKey ?? "workbench.appearance";
  const rootElement = appearanceOptions?.rootElement;
  const localeControlled = controlledLocale !== undefined;
  const resolvedDefaultAppearance = useMemo(
    () => normalizeWorkbenchAppearance(appearanceOptions?.defaultValue),
    [appearanceOptions?.defaultValue],
  );
  const [appearance, setLocalAppearance] = useState<WorkbenchAppearance>(() =>
    resolveInitialAppearance(resolvedDefaultAppearance, storageKey),
  );
  const [localLocale, setLocalLocale] = useState<WorkbenchLocale>(
    () => controlledLocale ?? resolveInitialLocale(readStoredLocale(localeStorageKey), defaultLocale),
  );
  const [systemMode, setSystemMode] = useState<WorkbenchResolvedThemeMode>(getSystemThemeMode);
  const resolvedMode = resolveWorkbenchThemeMode(appearance.mode, systemMode);
  const locale = controlledLocale ?? localLocale;
  const localePack = workbenchLocales[locale];
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
    () => (nextLocale: WorkbenchLocale) => {
      if (localeControlled) {
        onLocaleChange?.(nextLocale);
        return;
      }

      setLocalLocale(nextLocale);
    },
    [localeControlled, onLocaleChange],
  );

  const localeContextValue = useMemo<WorkbenchLocaleContextValue>(
    () => ({
      antdLocale: localePack.antdLocale,
      locale,
      messages: localePack.messages,
      setLocale,
      toggleLocale() {
        setLocale(locale === "zh-CN" ? "en-US" : "zh-CN");
      },
    }),
    [locale, localePack, setLocale],
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
      onLocaleChange?.(locale);
    }
  }, [locale, localeControlled, localeStorageKey, onLocaleChange]);

  useEffect(() => {
    const target = rootElement ?? globalThis.document?.documentElement;
    if (!target || !locale) {
      return;
    }

    const previousLang = target.getAttribute("lang");
    target.setAttribute("data-workbench-locale", locale);
    target.setAttribute("lang", localePack.documentLang);

    return () => {
      target.removeAttribute("data-workbench-locale");
      if (previousLang) {
        target.setAttribute("lang", previousLang);
      } else {
        target.removeAttribute("lang");
      }
    };
  }, [locale, localePack.documentLang, rootElement]);

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
        <ConfigProvider {...antd?.config} locale={localePack.antdLocale} theme={antdTheme}>
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

function resolveInitialLocale(stored: string | null, fallback: WorkbenchLocale): WorkbenchLocale {
  if (stored === "zh-CN" || stored === "en-US") return stored;
  const browserLocale = globalThis.navigator?.language;
  if (browserLocale?.toLowerCase().startsWith("zh")) return "zh-CN";
  if (browserLocale) return "en-US";
  return fallback;
}
