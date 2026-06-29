import { defaultWorkbenchAppearance, workbenchSurfaceTones } from "./defaults";
import type {
  WorkbenchAppearance,
  WorkbenchDensity,
  WorkbenchSchemeName,
  WorkbenchSurfaceTone,
  WorkbenchThemeMode,
} from "./model";
import { clamp, normalizeHexColor } from "../theme/color";
import { workbenchSchemes } from "../theme/schemes";

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
    radius: normalizeRadius(next.radius),
    scheme: normalizeScheme(next.scheme),
    surface: normalizeSurface(next.surface),
  };
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

function normalizeRadius(value: number): number {
  const radius = Number(value);
  return clamp(
    Math.round(Number.isFinite(radius) ? radius : defaultWorkbenchAppearance.radius),
    0,
    12,
  );
}
