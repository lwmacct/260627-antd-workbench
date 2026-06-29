import type { MenuProps } from "antd";
import type { WorkbenchNavEntry, WorkbenchNavGroup } from "./model";

export function toAntdMenuItems(items: WorkbenchNavEntry[]): MenuProps["items"] {
  return items.map((item) => {
    if (isNavGroup(item)) {
      return {
        children: toAntdMenuItems(item.children),
        key: item.key,
        label: item.label,
        type: "group",
      };
    }

    return {
      children: item.children ? toAntdMenuItems(item.children) : undefined,
      disabled: item.disabled,
      icon: item.icon,
      key: item.key,
      label: item.label,
      title: item.title,
    };
  });
}

function isNavGroup(item: WorkbenchNavEntry): item is WorkbenchNavGroup {
  return "type" in item && item.type === "group";
}
