import { App as AntdApp, ConfigProvider } from "antd";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createWorkbenchCssVars,
  createWorkbenchPalette,
  createWorkbenchTheme,
  defaultWorkbenchAppearance,
  normalizeWorkbenchAppearance,
  resolveWorkbenchThemeMode,
  type WorkbenchAppearance,
  type WorkbenchPalette,
  type WorkbenchResolvedThemeMode,
  type WorkbenchThemeMode,
} from "./theme";

export interface WorkbenchAppearanceContextValue {
  appearance: WorkbenchAppearance;
  palette: WorkbenchPalette;
  patchAppearance(patch: Partial<WorkbenchAppearance>): void;
  resetAppearance(): void;
  resolvedMode: WorkbenchResolvedThemeMode;
  setAppearance(appearance: WorkbenchAppearance): void;
  setThemeMode(themeMode: WorkbenchThemeMode): void;
  toggleThemeMode(): void;
}

export interface WorkbenchProviderProps {
  children: ReactNode;
  defaultAppearance?: Partial<WorkbenchAppearance>;
  rootElement?: HTMLElement | null;
  storageKey?: false | string;
  withAntdApp?: boolean;
  onAppearanceChange?(appearance: WorkbenchAppearance): void;
}

const WorkbenchAppearanceContext = createContext<WorkbenchAppearanceContextValue | null>(null);

export function WorkbenchProvider({
  children,
  defaultAppearance,
  rootElement,
  storageKey = "workbench.appearance",
  withAntdApp = true,
  onAppearanceChange,
}: WorkbenchProviderProps) {
  const resolvedDefaultAppearance = useMemo(
    () => normalizeWorkbenchAppearance(defaultAppearance),
    [defaultAppearance],
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
    if (storageKey !== false) {
      globalThis.localStorage?.setItem(storageKey, JSON.stringify(appearance));
    }

    onAppearanceChange?.(appearance);
  }, [appearance, onAppearanceChange, storageKey]);

  useEffect(() => {
    const target = rootElement ?? globalThis.document?.documentElement;
    if (!target) {
      return;
    }

    target.setAttribute("data-theme", resolvedMode);
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
    throw new Error("useWorkbenchAppearance must be used within WorkbenchProvider.");
  }

  return context;
}

function resolveInitialAppearance(
  defaultAppearance: WorkbenchAppearance,
  storageKey: false | string,
): WorkbenchAppearance {
  if (storageKey === false) {
    return defaultAppearance;
  }

  const stored = globalThis.localStorage?.getItem(storageKey);

  if (!stored) {
    return defaultAppearance;
  }

  try {
    return normalizeWorkbenchAppearance({
      ...defaultAppearance,
      ...(JSON.parse(stored) as Partial<WorkbenchAppearance>),
    });
  } catch {
    return defaultAppearance;
  }
}

export { defaultWorkbenchAppearance };
export type {
  WorkbenchAppearance,
  WorkbenchDensity,
  WorkbenchResolvedThemeMode,
  WorkbenchThemeMode,
} from "./theme";

function getSystemThemeMode(): WorkbenchResolvedThemeMode {
  return globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
