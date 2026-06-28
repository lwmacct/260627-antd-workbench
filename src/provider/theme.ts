import { theme, type ThemeConfig } from "antd";

export type WorkbenchThemeMode = "dark" | "light" | "system";
export type WorkbenchResolvedThemeMode = "dark" | "light";
export type WorkbenchDensity = "compact" | "comfortable" | "spacious";
export type WorkbenchSchemeName =
  | "carbon"
  | "graphite"
  | "midnight"
  | "mist"
  | "paper"
  | "porcelain"
  | "warm"
  | "zinc";
export type WorkbenchSurfaceTone = "black" | "deep" | "soft" | "tinted";

export interface WorkbenchAppearance {
  accent: string;
  density: WorkbenchDensity;
  mode: WorkbenchThemeMode;
  radius: number;
  scheme: WorkbenchSchemeName;
  surface: WorkbenchSurfaceTone;
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

interface WorkbenchScheme {
  dark: BasePalette;
  light: BasePalette;
  label: string;
  name: WorkbenchSchemeName;
}

interface WorkbenchSurfaceToneDefinition {
  label: string;
  name: WorkbenchSurfaceTone;
}

const fontFamily =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const defaultWorkbenchAppearance: WorkbenchAppearance = {
  accent: "#2388ff",
  density: "comfortable",
  mode: "dark",
  radius: 6,
  scheme: "graphite",
  surface: "deep",
};

export const workbenchAccentPresets = [
  { label: "Blue", value: "#2388ff" },
  { label: "Cyan", value: "#13b8d8" },
  { label: "Green", value: "#2fbf71" },
  { label: "Amber", value: "#d99118" },
  { label: "Rose", value: "#e85d75" },
  { label: "Violet", value: "#8b7cf6" },
] as const;

export const workbenchSurfaceTones: WorkbenchSurfaceToneDefinition[] = [
  { label: "黑", name: "black" },
  { label: "深", name: "deep" },
  { label: "柔", name: "soft" },
  { label: "染", name: "tinted" },
];

export const workbenchSchemes: WorkbenchScheme[] = [
  {
    label: "Graphite",
    name: "graphite",
    dark: createNeutralBase("#101214", "#171a1f", "#1c2026", "#1f242b", "#15181d"),
    light: createNeutralBase("#f4f6f8", "#ffffff", "#ffffff", "#ffffff", "#f8fafc"),
  },
  {
    label: "Midnight",
    name: "midnight",
    dark: createNeutralBase("#0b1020", "#111827", "#172033", "#1b2538", "#0f172a"),
    light: createNeutralBase("#f3f7fb", "#ffffff", "#ffffff", "#ffffff", "#f6f9fc"),
  },
  {
    label: "Carbon",
    name: "carbon",
    dark: createNeutralBase("#08090b", "#101216", "#171a20", "#1b1f27", "#0d0f13"),
    light: createNeutralBase("#f5f5f6", "#ffffff", "#ffffff", "#ffffff", "#fafafa"),
  },
  {
    label: "Zinc",
    name: "zinc",
    dark: createNeutralBase("#111113", "#18181b", "#202024", "#232329", "#161618"),
    light: createNeutralBase("#f6f6f7", "#ffffff", "#ffffff", "#ffffff", "#fafafa"),
  },
  {
    label: "Paper",
    name: "paper",
    dark: createNeutralBase("#111214", "#17191d", "#1d2025", "#20242a", "#15171b"),
    light: createNeutralBase("#f7f8fa", "#ffffff", "#ffffff", "#ffffff", "#fbfcfd"),
  },
  {
    label: "Mist",
    name: "mist",
    dark: createNeutralBase("#0f1418", "#172025", "#1e2930", "#223039", "#131b20"),
    light: createNeutralBase("#eef3f7", "#fbfdff", "#ffffff", "#ffffff", "#f5f9fc"),
  },
  {
    label: "Porcelain",
    name: "porcelain",
    dark: createNeutralBase("#101418", "#182129", "#1d2832", "#22303b", "#141c23"),
    light: createNeutralBase("#f1f6fb", "#ffffff", "#ffffff", "#ffffff", "#f7fbff"),
  },
  {
    label: "Warm",
    name: "warm",
    dark: createNeutralBase("#151210", "#1d1915", "#252019", "#29241d", "#191510"),
    light: createNeutralBase("#f8f7f4", "#ffffff", "#ffffff", "#ffffff", "#fbfaf7"),
  },
];

export function normalizeWorkbenchAppearance(
  value?: Partial<WorkbenchAppearance>,
): WorkbenchAppearance {
  const next = {
    ...defaultWorkbenchAppearance,
    ...value,
  };

  return {
    accent: normalizeHexColor(next.accent, defaultWorkbenchAppearance.accent),
    density: normalizeDensity(next.density),
    mode: normalizeThemeMode(next.mode),
    radius: clamp(Math.round(Number(next.radius) || defaultWorkbenchAppearance.radius), 0, 12),
    scheme: normalizeScheme(next.scheme),
    surface: normalizeSurface(next.surface),
  };
}

export function resolveWorkbenchThemeMode(
  mode: WorkbenchThemeMode,
  systemMode: WorkbenchResolvedThemeMode = "dark",
): WorkbenchResolvedThemeMode {
  return mode === "system" ? systemMode : mode;
}

export function createWorkbenchBasePalette(
  appearance: WorkbenchAppearance,
  resolvedMode = resolveWorkbenchThemeMode(appearance.mode),
): BasePalette {
  const scheme = getWorkbenchScheme(appearance.scheme);
  const base = scheme[resolvedMode];
  return applySurfaceTone(base, appearance.surface, resolvedMode, appearance.accent);
}

export function createWorkbenchPalette(
  appearance: WorkbenchAppearance,
  resolvedMode = resolveWorkbenchThemeMode(appearance.mode),
): WorkbenchPalette {
  const base = createWorkbenchBasePalette(appearance, resolvedMode);
  const dark = resolvedMode === "dark";
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
  resolvedMode = resolveWorkbenchThemeMode(appearance.mode),
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

function createNeutralBase(
  bg: string,
  workbench: string,
  header: string,
  panel: string,
  sidebar: string,
): BasePalette {
  const dark = relativeLuminance(bg) < 0.5;

  return {
    active: dark ? mixHex(panel, "#ffffff", 0.12) : mixHex("#ddeeff", bg, 0.16),
    bg,
    border: dark ? mixHex(panel, "#ffffff", 0.22) : "#c8d2df",
    borderSoft: dark ? mixHex(panel, "#ffffff", 0.11) : "#dfe6ef",
    danger: dark ? "#ff7f73" : "#d92d20",
    header,
    hover: dark ? mixHex(panel, "#ffffff", 0.08) : "#eef3f8",
    input: dark ? mixHex(panel, "#ffffff", 0.04) : "#ffffff",
    panel,
    panelElevated: dark ? mixHex(panel, "#ffffff", 0.06) : "#ffffff",
    panelMuted: dark ? mixHex(panel, "#ffffff", 0.11) : "#f1f5f9",
    sidebar,
    success: dark ? "#57d68d" : "#178248",
    text: dark ? "#e3e7ed" : "#1f2937",
    textMuted: dark ? "#9da8b7" : "#667085",
    textSecondary: dark ? "#c2cad6" : "#475569",
    textStrong: dark ? "#fbfcfe" : "#0f172a",
    textSubtle: dark ? "#7b8797" : "#8a94a6",
    warning: dark ? "#e7b84f" : "#a86700",
    workbench,
  };
}

function applySurfaceTone(
  base: BasePalette,
  surface: WorkbenchSurfaceTone,
  mode: WorkbenchResolvedThemeMode,
  accent: string,
): BasePalette {
  const dark = mode === "dark";
  const tint = surface === "tinted" ? normalizeHexColor(accent, defaultWorkbenchAppearance.accent) : "";
  const target = surface === "tinted" ? tint : dark ? "#000000" : "#ffffff";
  const amount = surfaceAmount(surface, dark);

  if (amount === 0) {
    return base;
  }

  return {
    ...base,
    active: mixHex(base.active, target, amount * 0.36),
    bg: mixHex(base.bg, target, amount),
    border: mixHex(base.border, target, amount * 0.3),
    borderSoft: mixHex(base.borderSoft, target, amount * 0.26),
    header: mixHex(base.header, target, amount * 0.74),
    hover: mixHex(base.hover, target, amount * 0.35),
    input: mixHex(base.input, target, amount * 0.42),
    panel: mixHex(base.panel, target, amount * 0.55),
    panelElevated: mixHex(base.panelElevated, target, amount * 0.48),
    panelMuted: mixHex(base.panelMuted, target, amount * 0.38),
    sidebar: mixHex(base.sidebar, target, amount * 0.72),
    workbench: mixHex(base.workbench, target, amount * 0.64),
  };
}

function surfaceAmount(surface: WorkbenchSurfaceTone, dark: boolean): number {
  if (surface === "black") {
    return dark ? 0.28 : 0;
  }
  if (surface === "soft") {
    return dark ? -0.08 : 0.18;
  }
  if (surface === "tinted") {
    return dark ? 0.13 : 0.06;
  }
  return 0;
}

function getWorkbenchScheme(name: WorkbenchSchemeName): WorkbenchScheme {
  return workbenchSchemes.find((scheme) => scheme.name === name) ?? workbenchSchemes[0];
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

function normalizeDensity(value: string): WorkbenchDensity {
  if (value === "compact" || value === "spacious") {
    return value;
  }
  return "comfortable";
}

function normalizeScheme(value: string): WorkbenchSchemeName {
  return workbenchSchemes.some((scheme) => scheme.name === value)
    ? (value as WorkbenchSchemeName)
    : defaultWorkbenchAppearance.scheme;
}

function normalizeSurface(value: string): WorkbenchSurfaceTone {
  return workbenchSurfaceTones.some((surface) => surface.name === value)
    ? (value as WorkbenchSurfaceTone)
    : defaultWorkbenchAppearance.surface;
}

function normalizeThemeMode(value: string): WorkbenchThemeMode {
  return value === "light" || value === "system" ? value : "dark";
}

function alphaHex(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function mixHex(from: string, to: string, amount: number): string {
  const safeAmount = clamp(amount, -1, 1);

  if (safeAmount < 0) {
    return mixHex(from, relativeLuminance(from) < 0.5 ? "#ffffff" : "#000000", -safeAmount);
  }

  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const mix = {
    r: Math.round(a.r + (b.r - a.r) * safeAmount),
    g: Math.round(a.g + (b.g - a.g) * safeAmount),
    b: Math.round(a.b + (b.b - a.b) * safeAmount),
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

function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const channel = (value: number) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
