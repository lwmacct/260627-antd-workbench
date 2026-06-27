import "./styles.css";

export {
  WorkbenchProvider,
  useWorkbenchThemeMode,
  useWorkbenchTheme,
} from "./provider/WorkbenchProvider";
export {
  createWorkbenchTheme,
  workbenchPalettes,
} from "./provider/theme";
export { WorkbenchHeader } from "./shell/WorkbenchHeader";
export { WorkbenchShell } from "./shell/WorkbenchShell";
export { WorkbenchSectionLayout } from "./section/WorkbenchSectionLayout";
export { WorkbenchPage } from "./page/WorkbenchPage";
export { WorkbenchUserMenu } from "./user/WorkbenchUserMenu";
export { cx } from "./utils/cx";
export { findMenuItem, getMenuItemLabel } from "./utils/menu";

export type {
  WorkbenchProviderProps,
  WorkbenchThemeContextValue,
  WorkbenchThemeMode,
} from "./provider/WorkbenchProvider";
export type {
  WorkbenchPalette,
  WorkbenchPaletteName,
} from "./provider/theme";
export type {
  WorkbenchBrand,
  WorkbenchHeaderProps,
} from "./shell/WorkbenchHeader";
export type { WorkbenchShellProps } from "./shell/WorkbenchShell";
export type { WorkbenchSectionLayoutProps } from "./section/WorkbenchSectionLayout";
export type { WorkbenchPageProps } from "./page/WorkbenchPage";
export type {
  WorkbenchUserMenuLabels,
  WorkbenchUserMenuProps,
} from "./user/WorkbenchUserMenu";
export type { WorkbenchMenuItem } from "./utils/menu";
