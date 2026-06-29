import type { ReactNode } from "react";

export interface WorkbenchNavItem {
  children?: WorkbenchNavItem[];
  disabled?: boolean;
  icon?: ReactNode;
  key: string;
  label: ReactNode;
  title?: string;
}

export interface WorkbenchNavGroup {
  children: WorkbenchNavItem[];
  key: string;
  label: ReactNode;
  type: "group";
}

export type WorkbenchNavEntry = WorkbenchNavGroup | WorkbenchNavItem;

