import { defaultWorkbenchAppearance } from "../appearance/defaults";
import type {
  WorkbenchAppearance,
  WorkbenchResolvedThemeMode,
} from "../appearance/model";
import { alphaHex, mixHex, normalizeHexColor } from "./color";
import type { WorkbenchBasePalette, WorkbenchPalette } from "./model";
import { getWorkbenchScheme } from "./schemes";
import { applySurfaceTone } from "./surface";

export function createWorkbenchBasePalette(
  appearance: WorkbenchAppearance,
  resolvedMode: WorkbenchResolvedThemeMode,
): WorkbenchBasePalette {
  const scheme = getWorkbenchScheme(appearance.scheme);
  const base = scheme[resolvedMode];
  return applySurfaceTone(base, appearance.surface, resolvedMode, appearance.accent);
}

export function createWorkbenchPalette(
  appearance: WorkbenchAppearance,
  resolvedMode: WorkbenchResolvedThemeMode,
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

