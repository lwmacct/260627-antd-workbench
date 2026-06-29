import type { WorkbenchAppearance, WorkbenchSurfaceTone } from "./model";

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

export interface WorkbenchSurfaceToneDefinition {
  label: string;
  name: WorkbenchSurfaceTone;
}

export const workbenchSurfaceTones: WorkbenchSurfaceToneDefinition[] = [
  { label: "黑", name: "black" },
  { label: "深", name: "deep" },
  { label: "柔", name: "soft" },
  { label: "染", name: "tinted" },
];

