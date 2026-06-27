import { App as AntdApp, ConfigProvider, type ThemeConfig } from "antd";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createWorkbenchTheme, type WorkbenchPaletteName } from "./theme";

export type WorkbenchThemeMode = WorkbenchPaletteName;

export interface WorkbenchThemeContextValue {
  setThemeMode(themeMode: WorkbenchThemeMode): void;
  themeMode: WorkbenchThemeMode;
  toggleThemeMode(): void;
}

export interface WorkbenchProviderProps {
  children: ReactNode;
  defaultThemeMode?: WorkbenchThemeMode;
  rootElement?: HTMLElement | null;
  storageKey?: false | string;
  theme?: ThemeConfig;
  themeMode?: WorkbenchThemeMode;
  withAntdApp?: boolean;
  onThemeModeChange?(themeMode: WorkbenchThemeMode): void;
}

const WorkbenchThemeContext = createContext<WorkbenchThemeContextValue | null>(null);

export function WorkbenchProvider({
  children,
  defaultThemeMode = "dark",
  rootElement,
  storageKey = "workbench.theme",
  theme,
  themeMode,
  withAntdApp = true,
  onThemeModeChange,
}: WorkbenchProviderProps) {
  const [localThemeMode, setLocalThemeMode] = useState<WorkbenchThemeMode>(() =>
    resolveInitialThemeMode(defaultThemeMode, storageKey),
  );
  const currentThemeMode = themeMode ?? localThemeMode;

  const contextValue = useMemo<WorkbenchThemeContextValue>(
    () => ({
      setThemeMode(nextThemeMode) {
        if (themeMode === undefined) {
          setLocalThemeMode(nextThemeMode);
        }
        onThemeModeChange?.(nextThemeMode);
      },
      themeMode: currentThemeMode,
      toggleThemeMode() {
        const nextThemeMode = currentThemeMode === "dark" ? "light" : "dark";
        if (themeMode === undefined) {
          setLocalThemeMode(nextThemeMode);
        }
        onThemeModeChange?.(nextThemeMode);
      },
    }),
    [currentThemeMode, onThemeModeChange, themeMode],
  );

  useEffect(() => {
    if (storageKey !== false) {
      globalThis.localStorage?.setItem(storageKey, currentThemeMode);
    }

    const target = rootElement ?? globalThis.document?.documentElement;
    target?.setAttribute("data-theme", currentThemeMode);
    target?.setAttribute("data-workbench-theme", currentThemeMode);

    return () => {
      target?.removeAttribute("data-workbench-theme");
    };
  }, [currentThemeMode, rootElement, storageKey]);

  const antdTheme = useMemo(
    () => createWorkbenchTheme(currentThemeMode, theme),
    [currentThemeMode, theme],
  );

  const content = withAntdApp ? <AntdApp component="div">{children}</AntdApp> : children;

  return (
    <WorkbenchThemeContext value={contextValue}>
      <ConfigProvider theme={antdTheme}>{content}</ConfigProvider>
    </WorkbenchThemeContext>
  );
}

export function useWorkbenchTheme(): WorkbenchThemeContextValue {
  const context = useContext(WorkbenchThemeContext);

  if (!context) {
    throw new Error("useWorkbenchTheme must be used within WorkbenchProvider.");
  }

  return context;
}

function resolveInitialThemeMode(
  defaultThemeMode: WorkbenchThemeMode,
  storageKey: false | string,
): WorkbenchThemeMode {
  if (storageKey === false) {
    return defaultThemeMode;
  }

  const stored = globalThis.localStorage?.getItem(storageKey);
  return stored === "dark" || stored === "light" ? stored : defaultThemeMode;
}
