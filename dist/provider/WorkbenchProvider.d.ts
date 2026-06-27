import { ThemeConfig } from 'antd';
import { ReactNode } from 'react';
import { WorkbenchPaletteName } from './theme';
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
export declare function WorkbenchProvider({ children, defaultThemeMode, rootElement, storageKey, theme, themeMode, withAntdApp, onThemeModeChange, }: WorkbenchProviderProps): import("react").JSX.Element;
export declare function useWorkbenchTheme(): WorkbenchThemeContextValue;
//# sourceMappingURL=WorkbenchProvider.d.ts.map