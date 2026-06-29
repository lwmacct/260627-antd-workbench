export type WorkbenchThemeMode = "dark" | "light" | "system";
export type WorkbenchResolvedThemeMode = "dark" | "light";
export type WorkbenchDensity = "compact" | "comfortable" | "spacious";
export type WorkbenchSchemeName =
  | "carbon"
  | "graphite"
  | "midnight"
  | "mist"
  | "neutral"
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

export type WorkbenchAppearancePatch = Partial<WorkbenchAppearance>;

