import { theme, type ThemeConfig } from "antd";
import type {
  WorkbenchAppearance,
  WorkbenchResolvedThemeMode,
} from "../appearance/model";
import type { WorkbenchPalette } from "./model";

const fontFamily =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export function createWorkbenchTheme(
  appearance: WorkbenchAppearance,
  palette: WorkbenchPalette,
  resolvedMode: WorkbenchResolvedThemeMode,
): ThemeConfig {
  const dark = resolvedMode === "dark";
  const compact = appearance.density === "compact";
  const spacious = appearance.density === "spacious";

  return {
    algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      borderRadius: appearance.radius,
      colorBgBase: palette.bg,
      colorBgLayout: palette.bg,
      colorBgContainer: palette.panel,
      colorBgElevated: palette.panelElevated,
      colorBgSpotlight: dark ? palette.panelMuted : palette.textStrong,
      colorBorder: palette.border,
      colorBorderSecondary: palette.borderSoft,
      colorError: palette.danger,
      colorFill: palette.active,
      colorFillAlter: palette.panelMuted,
      colorFillQuaternary: dark ? palette.input : palette.panel,
      colorFillSecondary: palette.hover,
      colorFillTertiary: palette.panelMuted,
      colorInfo: palette.accentHover,
      colorLink: palette.accentHover,
      colorLinkHover: palette.textStrong,
      colorPrimary: palette.accent,
      colorPrimaryActive: palette.accentActive,
      colorPrimaryHover: palette.accentHover,
      colorSplit: palette.border,
      colorSuccess: palette.success,
      colorText: palette.text,
      colorTextDescription: palette.textMuted,
      colorTextDisabled: palette.textSubtle,
      colorTextHeading: palette.textStrong,
      colorTextPlaceholder: palette.textMuted,
      colorTextQuaternary: palette.textSubtle,
      colorTextSecondary: palette.textSecondary,
      colorTextTertiary: palette.textMuted,
      colorWarning: palette.warning,
      controlHeight: compact ? 30 : spacious ? 38 : 34,
      controlHeightLG: compact ? 36 : spacious ? 44 : 40,
      controlHeightSM: compact ? 24 : spacious ? 30 : 28,
      controlItemBgActive: palette.accentSoft,
      controlItemBgActiveHover: palette.accentSoft,
      controlItemBgHover: palette.hover,
      controlOutline: palette.accentActive,
      boxShadowSecondary: dark
        ? "0 14px 34px rgba(0, 0, 0, 0.38)"
        : "0 12px 28px rgba(15, 23, 42, 0.12)",
      fontFamily,
    },
    components: {
      Button: {
        defaultActiveBg: palette.active,
        defaultActiveBorderColor: palette.border,
        defaultActiveColor: palette.textStrong,
        defaultBg: palette.panelMuted,
        defaultBorderColor: palette.border,
        defaultColor: palette.text,
        defaultHoverBg: palette.hover,
        defaultHoverBorderColor: palette.border,
        defaultHoverColor: palette.textStrong,
        primaryShadow: "none",
      },
      Card: {
        colorBgContainer: palette.panel,
        colorBorderSecondary: palette.border,
        headerBg: palette.panel,
        headerFontSize: 16,
      },
      Drawer: {
        colorBgElevated: palette.panelElevated,
        colorSplit: palette.border,
      },
      Dropdown: {
        colorBgElevated: palette.panelElevated,
        colorPrimary: palette.accentHover,
        colorSplit: palette.borderSoft,
        colorText: palette.text,
        colorTextDisabled: palette.textMuted,
        controlItemBgActive: palette.accentSoft,
        controlItemBgActiveHover: palette.accentSoft,
        controlItemBgHover: palette.hover,
        paddingBlock: 5,
      },
      Input: {
        activeBg: palette.input,
        activeBorderColor: palette.accentHover,
        addonBg: palette.panelMuted,
        colorBgContainer: palette.input,
        colorBorder: palette.border,
        hoverBg: palette.input,
        hoverBorderColor: palette.accent,
      },
      InputNumber: {
        activeBg: palette.input,
        activeBorderColor: palette.accentHover,
        colorBgContainer: palette.input,
        colorBorder: palette.border,
        hoverBg: palette.input,
        hoverBorderColor: palette.accent,
      },
      Layout: {
        bodyBg: palette.bg,
        headerBg: palette.header,
        siderBg: palette.sidebar,
      },
      Menu: {
        darkItemBg: palette.sidebar,
        darkItemColor: palette.textSecondary,
        darkItemHoverBg: palette.hover,
        darkItemHoverColor: palette.textStrong,
        darkItemSelectedBg: palette.accentSoft,
        darkItemSelectedColor: palette.accentHover,
        darkSubMenuItemBg: palette.sidebar,
        itemBg: "transparent",
        itemColor: palette.textSecondary,
        itemHoverBg: palette.hover,
        itemHoverColor: palette.textStrong,
        itemSelectedBg: palette.accentSoft,
        itemSelectedColor: palette.accentHover,
      },
      Modal: {
        contentBg: palette.panelElevated,
        headerBg: palette.panelElevated,
        titleColor: palette.textStrong,
      },
      Select: {
        activeBorderColor: palette.accentHover,
        clearBg: palette.input,
        colorBgContainer: palette.input,
        colorBgElevated: palette.panelElevated,
        colorBorder: palette.border,
        optionActiveBg: palette.hover,
        optionSelectedBg: palette.accentSoft,
        optionSelectedColor: palette.textStrong,
      },
      Table: {
        borderColor: palette.border,
        cellPaddingBlock: compact ? 10 : spacious ? 18 : 16,
        colorBgContainer: palette.workbench,
        footerBg: palette.panel,
        headerBg: palette.panel,
        headerColor: palette.textStrong,
        headerSplitColor: palette.border,
        rowHoverBg: palette.hover,
      },
      Tabs: {
        itemActiveColor: palette.textStrong,
        itemColor: palette.textSecondary,
        itemHoverColor: palette.accentHover,
        itemSelectedColor: palette.accentHover,
      },
      Tag: {
        defaultBg: palette.panelMuted,
        defaultColor: palette.text,
      },
    },
  };
}

