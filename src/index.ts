import "./styles.css";

export {
  WorkbenchProvider,
  defaultWorkbenchAppearance,
  useWorkbenchAppearance,
} from "./provider/WorkbenchProvider";
export {
  createWorkbenchCssVars,
  createWorkbenchPalette,
  createWorkbenchTheme,
  normalizeWorkbenchAppearance,
  resolveWorkbenchThemeMode,
  workbenchAccentPresets,
  workbenchSchemes,
  workbenchSurfaceTones,
} from "./provider/theme";
export { WorkbenchAppearanceSettings } from "./appearance/WorkbenchAppearanceSettings";
export { WorkbenchHeader } from "./shell/WorkbenchHeader";
export { WorkbenchShell } from "./shell/WorkbenchShell";
export { WorkbenchSectionLayout } from "./section/WorkbenchSectionLayout";
export { WorkbenchPage } from "./page/WorkbenchPage";
export { WorkbenchCenterState } from "./state/WorkbenchCenterState";
export { WorkbenchThemeToggle } from "./theme/WorkbenchThemeToggle";
export { WorkbenchUserMenu } from "./user/WorkbenchUserMenu";
export { cx } from "./utils/cx";
export { findMenuItem, getMenuItemLabel } from "./utils/menu";

export type {
  WorkbenchAppearance,
  WorkbenchAppearanceContextValue,
  WorkbenchDensity,
  WorkbenchProviderProps,
  WorkbenchResolvedThemeMode,
  WorkbenchThemeMode,
} from "./provider/WorkbenchProvider";
export type {
  WorkbenchPalette,
  WorkbenchSchemeName,
  WorkbenchSurfaceTone,
} from "./provider/theme";
export type {
  WorkbenchAppearanceSettingsLabels,
  WorkbenchAppearanceSettingsProps,
  WorkbenchAppearanceSettingsSection,
} from "./appearance/WorkbenchAppearanceSettings";
export type {
  WorkbenchBrand,
  WorkbenchHeaderProps,
} from "./shell/WorkbenchHeader";
export type { WorkbenchShellProps } from "./shell/WorkbenchShell";
export type {
  WorkbenchSectionLayoutLabels,
  WorkbenchSectionLayoutProps,
} from "./section/WorkbenchSectionLayout";
export type { WorkbenchPageProps } from "./page/WorkbenchPage";
export type { WorkbenchCenterStateProps } from "./state/WorkbenchCenterState";
export type {
  WorkbenchThemeToggleLabels,
  WorkbenchThemeToggleProps,
} from "./theme/WorkbenchThemeToggle";
export type {
  WorkbenchUserMenuLabels,
  WorkbenchUserMenuProps,
} from "./user/WorkbenchUserMenu";
export type { WorkbenchMenuItem } from "./utils/menu";
