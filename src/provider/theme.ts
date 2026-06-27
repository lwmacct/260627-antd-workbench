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
    accent: "#007acc",
    accentActive: "#04395e",
    accentHover: "#3794ff",
    accentSoft: "rgba(0, 122, 204, 0.18)",
    accentSofter: "rgba(0, 122, 204, 0.12)",
    active: "#37373d",
    bg: "#151515",
    border: "#3c3c3c",
    borderSoft: "#2b2b2b",
    danger: "#f48771",
    header: "#252526",
    hover: "#2a2d2e",
    input: "#313131",
    panel: "#202020",
    panelElevated: "#252526",
    panelMuted: "#2d2d30",
    sidebar: "#181818",
    success: "#89d185",
    text: "#cccccc",
    textMuted: "#858585",
    textSecondary: "#9d9d9d",
    textStrong: "#ffffff",
    textSubtle: "#6a6a6a",
    warning: "#cca700",
    workbench: "#1e1e1e",
  },
  light: {
    accent: "#0969da",
    accentActive: "#dbeafe",
    accentHover: "#0550ae",
    accentSoft: "rgba(9, 105, 218, 0.12)",
    accentSofter: "rgba(9, 105, 218, 0.08)",
    active: "#e8f2ff",
    bg: "#f3f3f3",
    border: "#d0d7de",
    borderSoft: "#e5e7eb",
    danger: "#cf222e",
    header: "#ffffff",
    hover: "#f3f4f6",
    input: "#ffffff",
    panel: "#ffffff",
    panelElevated: "#ffffff",
    panelMuted: "#f6f8fa",
    sidebar: "#f7f7f7",
    success: "#1a7f37",
    text: "#24292f",
    textMuted: "#6e7781",
    textSecondary: "#57606a",
    textStrong: "#111827",
    textSubtle: "#8c959f",
    warning: "#9a6700",
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
      colorBgSpotlight: palette.panelMuted,
      colorBorder: palette.border,
      colorBorderSecondary: palette.borderSoft,
      colorError: palette.danger,
      colorFill: palette.active,
      colorFillAlter: palette.panelMuted,
      colorFillQuaternary: palette.panel,
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
      controlItemBgHover: palette.hover,
      controlOutline: palette.accentActive,
      fontFamily,
      ...overrides?.token,
    },
    components: {
      Button: {
        defaultBg: palette.panelMuted,
        defaultBorderColor: palette.border,
        defaultColor: palette.text,
        defaultHoverBg: palette.hover,
        defaultHoverBorderColor: palette.accentHover,
        defaultHoverColor: palette.textStrong,
        primaryShadow: "none",
      },
      Card: {
        colorBgContainer: palette.panel,
        colorBorderSecondary: palette.border,
        headerBg: palette.panel,
      },
      Drawer: {
        colorBgElevated: palette.panelElevated,
        colorSplit: palette.border,
      },
      Input: {
        activeBg: palette.input,
        activeBorderColor: palette.accentHover,
        addonBg: palette.panelMuted,
        colorBgContainer: palette.input,
        hoverBg: palette.input,
        hoverBorderColor: palette.accent,
      },
      InputNumber: {
        activeBg: palette.input,
        activeBorderColor: palette.accentHover,
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
