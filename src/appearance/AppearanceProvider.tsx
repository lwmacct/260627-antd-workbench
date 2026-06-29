import { App as AntdApp, ConfigProvider } from "antd";
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
} from "./model";
import { normalizeWorkbenchAppearance } from "./normalize";
import { resolveInitialAppearance, writeStoredAppearance } from "./storage";
import { createWorkbenchTheme } from "../theme/antd";
import { createWorkbenchCssVars } from "../theme/cssVars";
import type { WorkbenchPalette } from "../theme/model";
import { createWorkbenchPalette } from "../theme/palette";

export interface WorkbenchAppearanceOptions {
  defaultValue?: WorkbenchAppearancePatch;
  rootElement?: HTMLElement | null;
  storageKey?: false | string;
  onChange?(appearance: WorkbenchAppearance): void;
}

export interface WorkbenchRootProps {
  appearance?: WorkbenchAppearanceOptions;
  children: ReactNode;
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

export function WorkbenchRoot({
  appearance: appearanceOptions,
  children,
  withAntdApp = true,
}: WorkbenchRootProps) {
  const storageKey = appearanceOptions?.storageKey ?? "workbench.appearance";
  const rootElement = appearanceOptions?.rootElement;
  const resolvedDefaultAppearance = useMemo(
    () => normalizeWorkbenchAppearance(appearanceOptions?.defaultValue),
    [appearanceOptions?.defaultValue],
  );
  const [appearance, setLocalAppearance] = useState<WorkbenchAppearance>(() =>
    resolveInitialAppearance(resolvedDefaultAppearance, storageKey),
  );
  const [systemMode, setSystemMode] = useState<WorkbenchResolvedThemeMode>(getSystemThemeMode);
  const resolvedMode = resolveWorkbenchThemeMode(appearance.mode, systemMode);
  const palette = useMemo(
    () => createWorkbenchPalette(appearance, resolvedMode),
    [appearance, resolvedMode],
  );
  const antdTheme = useMemo(
    () => createWorkbenchTheme(appearance, palette, resolvedMode),
    [appearance, palette, resolvedMode],
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
    target.style.setProperty("--app-control-radius", `${appearance.radius}px`);

    return () => {
      target.removeAttribute("data-workbench-density");
      target.removeAttribute("data-workbench-mode");
      target.removeAttribute("data-workbench-theme");
      Object.keys(cssVars).forEach((name) => {
        target.style.removeProperty(name);
      });
      target.style.removeProperty("--app-control-radius");
    };
  }, [appearance.density, appearance.mode, appearance.radius, palette, resolvedMode, rootElement]);

  const content = withAntdApp ? <AntdApp component="div">{children}</AntdApp> : children;

  return (
    <WorkbenchAppearanceContext value={contextValue}>
      <ConfigProvider theme={antdTheme}>{content}</ConfigProvider>
    </WorkbenchAppearanceContext>
  );
}

export function useWorkbenchAppearance(): WorkbenchAppearanceContextValue {
  const context = useContext(WorkbenchAppearanceContext);

  if (!context) {
    throw new Error("useWorkbenchAppearance must be used within WorkbenchRoot.");
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
