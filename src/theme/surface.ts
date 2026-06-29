import { defaultWorkbenchAppearance } from "../appearance/defaults";
import type { WorkbenchResolvedThemeMode, WorkbenchSurfaceTone } from "../appearance/model";
import { mixHex, normalizeHexColor } from "./color";
import type { WorkbenchBasePalette } from "./model";

export function applySurfaceTone(
  base: WorkbenchBasePalette,
  surface: WorkbenchSurfaceTone,
  mode: WorkbenchResolvedThemeMode,
  accent: string,
): WorkbenchBasePalette {
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

