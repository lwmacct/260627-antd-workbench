import { theme, type ThemeConfig } from "antd";

export type WorkbenchPaletteName = "dark" | "light";

export interface WorkbenchPalette {
  accent: string;
  accentActive: string;
  accentHover: string;
  accentSoft: string;
  accentSofter: string;
  active: string;
  bg: string;
  border: string;
  borderSoft: string;
  danger: string;
  header: string;
  hover: string;
  input: string;
  panel: string;
  panelElevated: string;
  panelMuted: string;
  sidebar: string;
  success: string;
  text: string;
  textMuted: string;
  textSecondary: string;
  textStrong: string;
  textSubtle: string;
  warning: string;
  workbench: string;
}

const fontFamily =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const workbenchPalettes: Record<WorkbenchPaletteName, WorkbenchPalette> = {
  dark: {
    accent: "#2388ff",
    accentActive: "#145da8",
    accentHover: "#65adff",
    accentSoft: "rgba(35, 136, 255, 0.24)",
    accentSofter: "rgba(35, 136, 255, 0.14)",
    active: "#343d49",
    bg: "#101214",
    border: "#424c59",
    borderSoft: "#303843",
    danger: "#ff7f73",
    header: "#1c2026",
    hover: "#2b323c",
    input: "#252b34",
    panel: "#1f242b",
    panelElevated: "#262c35",
    panelMuted: "#2d3540",
    sidebar: "#15181d",
    success: "#57d68d",
    text: "#e3e7ed",
    textMuted: "#9da8b7",
    textSecondary: "#c2cad6",
    textStrong: "#fbfcfe",
    textSubtle: "#7b8797",
    warning: "#e7b84f",
    workbench: "#171a1f",
  },
  light: {
    accent: "#0b70d7",
    accentActive: "#d8ebff",
    accentHover: "#0759b8",
    accentSoft: "rgba(11, 112, 215, 0.13)",
    accentSofter: "rgba(11, 112, 215, 0.08)",
    active: "#ddeeff",
    bg: "#f4f6f8",
    border: "#c8d2df",
    borderSoft: "#dfe6ef",
    danger: "#d92d20",
    header: "#ffffff",
    hover: "#eef3f8",
    input: "#ffffff",
    panel: "#ffffff",
    panelElevated: "#ffffff",
    panelMuted: "#f1f5f9",
    sidebar: "#f8fafc",
    success: "#178248",
    text: "#1f2937",
    textMuted: "#667085",
    textSecondary: "#475569",
    textStrong: "#0f172a",
    textSubtle: "#8a94a6",
    warning: "#a86700",
    workbench: "#ffffff",
  },
};

export function createWorkbenchTheme(
  themeMode: WorkbenchPaletteName,
  overrides?: ThemeConfig,
): ThemeConfig {
  const dark = themeMode === "dark";
  const palette = workbenchPalettes[themeMode];

  return {
    ...overrides,
    algorithm: overrides?.algorithm ?? (dark ? theme.darkAlgorithm : theme.defaultAlgorithm),
    token: {
      borderRadius: 6,
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
      controlItemBgActive: palette.accentSoft,
      controlItemBgActiveHover: palette.accentSoft,
      controlItemBgHover: palette.hover,
      controlOutline: palette.accentActive,
      boxShadowSecondary: dark
        ? "0 14px 34px rgba(0, 0, 0, 0.38)"
        : "0 12px 28px rgba(15, 23, 42, 0.12)",
      fontFamily,
      ...overrides?.token,
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
        colorBorder: palette.border,
        colorBgContainer: palette.input,
        hoverBg: palette.input,
        hoverBorderColor: palette.accent,
      },
      InputNumber: {
        activeBg: palette.input,
        activeBorderColor: palette.accentHover,
        colorBorder: palette.border,
        colorBgContainer: palette.input,
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
        colorBorder: palette.border,
        colorBgContainer: palette.input,
        colorBgElevated: palette.panelElevated,
        optionActiveBg: palette.hover,
        optionSelectedBg: palette.accentSoft,
        optionSelectedColor: palette.textStrong,
      },
      Table: {
        borderColor: palette.border,
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
      ...overrides?.components,
    },
  };
}
