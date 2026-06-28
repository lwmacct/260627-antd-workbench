import { theme, type ThemeConfig } from "antd";

export type WorkbenchThemeMode = "dark" | "light";
export type WorkbenchDensity = "compact" | "comfortable";

export interface WorkbenchAppearance {
  accent: string;
  density: WorkbenchDensity;
  mode: WorkbenchThemeMode;
  radius: number;
}

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

type BasePalette = Omit<
  WorkbenchPalette,
  "accent" | "accentActive" | "accentHover" | "accentSoft" | "accentSofter"
>;

const fontFamily =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const defaultWorkbenchAppearance: WorkbenchAppearance = {
  accent: "#2388ff",
  density: "comfortable",
  mode: "dark",
  radius: 6,
};

export const workbenchAccentPresets = [
  { label: "Blue", value: "#2388ff" },
  { label: "Cyan", value: "#13b8d8" },
  { label: "Green", value: "#2fbf71" },
  { label: "Amber", value: "#d99118" },
  { label: "Rose", value: "#e85d75" },
  { label: "Violet", value: "#8b7cf6" },
] as const;

export const workbenchBasePalettes: Record<WorkbenchThemeMode, BasePalette> = {
  dark: {
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

export function normalizeWorkbenchAppearance(
  value?: Partial<WorkbenchAppearance>,
): WorkbenchAppearance {
  const next = {
    ...defaultWorkbenchAppearance,
    ...value,
  };

  return {
    accent: normalizeHexColor(next.accent, defaultWorkbenchAppearance.accent),
    density: next.density === "compact" ? "compact" : "comfortable",
    mode: next.mode === "light" ? "light" : "dark",
    radius: clamp(Math.round(Number(next.radius) || defaultWorkbenchAppearance.radius), 0, 12),
  };
}

export function createWorkbenchPalette(appearance: WorkbenchAppearance): WorkbenchPalette {
  const base = workbenchBasePalettes[appearance.mode];
  const dark = appearance.mode === "dark";
  const accent = normalizeHexColor(appearance.accent, defaultWorkbenchAppearance.accent);

  return {
    ...base,
    accent,
    accentActive: dark ? mixHex(accent, "#000000", 0.34) : mixHex(accent, "#ffffff", 0.82),
    accentHover: dark ? mixHex(accent, "#ffffff", 0.26) : mixHex(accent, "#000000", 0.16),
    accentSoft: alphaHex(accent, dark ? 0.24 : 0.13),
    accentSofter: alphaHex(accent, dark ? 0.14 : 0.08),
  };
}

export function createWorkbenchCssVars(palette: WorkbenchPalette): Record<string, string> {
  return {
    "--app-active-bg": palette.active,
    "--app-accent": palette.accent,
    "--app-accent-active": palette.accentActive,
    "--app-accent-hover": palette.accentHover,
    "--app-accent-soft": palette.accentSoft,
    "--app-accent-softer": palette.accentSofter,
    "--app-bg": palette.bg,
    "--app-border": palette.border,
    "--app-border-soft": palette.borderSoft,
    "--app-card-bg": palette.panel,
    "--app-card-elevated-bg": palette.panelElevated,
    "--app-card-muted-bg": palette.panelMuted,
    "--app-danger": palette.danger,
    "--app-header-bg": palette.header,
    "--app-hover-bg": palette.hover,
    "--app-input-bg": palette.input,
    "--app-panel-muted-bg": palette.panelMuted,
    "--app-sidebar-bg": palette.sidebar,
    "--app-success": palette.success,
    "--app-text": palette.text,
    "--app-text-muted": palette.textMuted,
    "--app-text-secondary": palette.textSecondary,
    "--app-text-strong": palette.textStrong,
    "--app-text-subtle": palette.textSubtle,
    "--app-warning": palette.warning,
    "--app-workbench-bg": palette.workbench,
  };
}

export function createWorkbenchTheme(
  appearance: WorkbenchAppearance,
  palette = createWorkbenchPalette(appearance),
): ThemeConfig {
  const dark = appearance.mode === "dark";
  const compact = appearance.density === "compact";

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
      controlHeight: compact ? 30 : 34,
      controlHeightLG: compact ? 36 : 40,
      controlHeightSM: compact ? 24 : 28,
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
        cellPaddingBlock: compact ? 10 : 16,
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

function normalizeHexColor(value: string, fallback: string): string {
  const normalized = value.trim().toLowerCase();
  const short = /^#([0-9a-f]{3})$/i.exec(normalized);

  if (short) {
    return `#${short[1]
      .split("")
      .map((char) => `${char}${char}`)
      .join("")}`;
  }

  return /^#[0-9a-f]{6}$/i.test(normalized) ? normalized : fallback;
}

function alphaHex(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function mixHex(from: string, to: string, amount: number): string {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const mix = {
    r: Math.round(a.r + (b.r - a.r) * amount),
    g: Math.round(a.g + (b.g - a.g) * amount),
    b: Math.round(a.b + (b.b - a.b) * amount),
  };
  return rgbToHex(mix);
}

function hexToRgb(hex: string): { b: number; g: number; r: number } {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex(rgb: { b: number; g: number; r: number }): string {
  return `#${[rgb.r, rgb.g, rgb.b]
    .map((value) => clamp(value, 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
