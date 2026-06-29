import type { ReactNode } from "react";
import type { WorkbenchNavEntry, WorkbenchNavItem } from "./model";

export function findNavItem(
  items: WorkbenchNavEntry[] | undefined,
  activeKey: string,
): WorkbenchNavItem | null {
  for (const item of items ?? []) {
    if (isNavGroup(item)) {
      const child = findNavItem(item.children, activeKey);
      if (child) {
        return child;
      }
      continue;
    }

    if (item.key === activeKey) {
      return item;
    }

    const child = findNavItem(item.children, activeKey);
    if (child) {
      return child;
    }
  }

  return null;
}

export function getNavItemLabel(
  items: WorkbenchNavEntry[] | undefined,
  activeKey: string,
  fallback: ReactNode,
): ReactNode {
  return findNavItem(items, activeKey)?.label ?? fallback;
}

function isNavGroup(item: WorkbenchNavEntry): item is Extract<WorkbenchNavEntry, { type: "group" }> {
  return "type" in item && item.type === "group";
}
