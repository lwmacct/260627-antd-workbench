import type { WorkbenchResolvedThemeMode, WorkbenchSchemeName } from "../appearance/model";
import { mixHex, relativeLuminance } from "./color";
import type { WorkbenchBasePalette } from "./model";

export interface WorkbenchScheme {
  dark: WorkbenchBasePalette;
  light: WorkbenchBasePalette;
  label: string;
  name: WorkbenchSchemeName;
}

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
    label: "Neutral",
    name: "neutral",
    dark: createAntdNeutralBase("dark"),
    light: createAntdNeutralBase("light"),
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

export function getWorkbenchScheme(name: WorkbenchSchemeName): WorkbenchScheme {
  return workbenchSchemes.find((scheme) => scheme.name === name) ?? workbenchSchemes[0];
}

function createNeutralBase(
  bg: string,
  workbench: string,
  header: string,
  panel: string,
  sidebar: string,
): WorkbenchBasePalette {
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

function createAntdNeutralBase(mode: WorkbenchResolvedThemeMode): WorkbenchBasePalette {
  if (mode === "light") {
    return {
      active: "#e6f4ff",
      bg: "#f5f5f5",
      border: "#d9d9d9",
      borderSoft: "#f0f0f0",
      danger: "#e45959",
      header: "#ffffff",
      hover: "#f5f5f5",
      input: "#ffffff",
      panel: "#ffffff",
      panelElevated: "#ffffff",
      panelMuted: "#fafafa",
      sidebar: "#ffffff",
      success: "#178248",
      text: "#1f1f1f",
      textMuted: "#8c8c8c",
      textSecondary: "#595959",
      textStrong: "#000000",
      textSubtle: "#bfbfbf",
      warning: "#a86700",
      workbench: "#ffffff",
    };
  }

  return {
    active: "#303030",
    bg: "#141414",
    border: "#303030",
    borderSoft: "#262626",
    danger: "#e45959",
    header: "#1f1f1f",
    hover: "#2a2a2a",
    input: "#1f1f1f",
    panel: "#1f1f1f",
    panelElevated: "#262626",
    panelMuted: "#262626",
    sidebar: "#1f1f1f",
    success: "#59db8f",
    text: "#d9d9d9",
    textMuted: "#8c8c8c",
    textSecondary: "#bfbfbf",
    textStrong: "#ffffff",
    textSubtle: "#6f6f6f",
    warning: "#e7b84f",
    workbench: "#141414",
  };
}

