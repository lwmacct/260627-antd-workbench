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

export type WorkbenchBasePalette = Omit<
  WorkbenchPalette,
  "accent" | "accentActive" | "accentHover" | "accentSoft" | "accentSofter"
>;

