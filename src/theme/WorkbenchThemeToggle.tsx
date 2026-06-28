import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import type { ReactNode } from "react";
import { useWorkbenchAppearance } from "../provider/WorkbenchProvider";

export interface WorkbenchThemeToggleLabels {
  switchToDark?: ReactNode;
  switchToLight?: ReactNode;
}

export interface WorkbenchThemeToggleProps {
  labels?: WorkbenchThemeToggleLabels;
}

export function WorkbenchThemeToggle({ labels }: WorkbenchThemeToggleProps) {
  const { resolvedMode, toggleThemeMode } = useWorkbenchAppearance();
  const dark = resolvedMode === "dark";
  const title = dark
    ? labels?.switchToLight || "切换浅色模式"
    : labels?.switchToDark || "切换深色模式";

  return (
    <Tooltip title={title}>
      <Button
        aria-label={typeof title === "string" ? title : "切换主题"}
        icon={dark ? <SunOutlined /> : <MoonOutlined />}
        shape="circle"
        type="text"
        onClick={toggleThemeMode}
      />
    </Tooltip>
  );
}
