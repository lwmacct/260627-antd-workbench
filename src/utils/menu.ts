import type { MenuProps } from "antd";
import type { ReactNode } from "react";

export interface WorkbenchMenuItem {
  icon?: ReactNode;
  key: string;
  label: ReactNode;
}

export function findMenuItem(
  items: MenuProps["items"],
  activeKey: string,
): WorkbenchMenuItem | null {
  for (const item of items ?? []) {
    if (!item) {
      continue;
    }

    if ("children" in item && Array.isArray(item.children)) {
      const child = findMenuItem(item.children, activeKey);
      if (child) {
        return child;
      }
    }

    if ("key" in item && item.key === activeKey && "label" in item) {
      return {
        icon: "icon" in item ? item.icon : undefined,
        key: String(item.key),
        label: item.label,
      };
    }
  }

  return null;
}

export function getMenuItemLabel(
  items: MenuProps["items"],
  activeKey: string,
  fallback: ReactNode,
): ReactNode {
  return findMenuItem(items, activeKey)?.label ?? fallback;
}
