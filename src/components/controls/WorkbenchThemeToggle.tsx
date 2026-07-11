import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useWorkbenchLocale } from "../../locale/context";
import { useWorkbenchAppearance } from "../../provider/WorkbenchProvider";

export function WorkbenchThemeToggle() {
  const { resolvedMode, toggleThemeMode } = useWorkbenchAppearance();
  const { messages } = useWorkbenchLocale();
  const dark = resolvedMode === "dark";
  const title = dark
    ? messages.theme.switchToLight
    : messages.theme.switchToDark;

  return (
    <Tooltip title={title}>
      <Button
        aria-label={title}
        className="wb-header-action"
        icon={dark ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleThemeMode}
      />
    </Tooltip>
  );
}
