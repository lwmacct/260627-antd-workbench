import { GlobalOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useWorkbenchLocale } from "../../locale/context";

export interface WorkbenchLanguageToggleProps {
  iconOnly?: boolean;
}

export function WorkbenchLanguageToggle({
  iconOnly = false,
}: WorkbenchLanguageToggleProps) {
  const { messages, toggleLocale } = useWorkbenchLocale();

  return (
    <Tooltip title={messages.language.switchLanguage}>
      <Button
        aria-label={messages.language.switchLanguage}
        icon={<GlobalOutlined />}
        shape={iconOnly ? "circle" : undefined}
        type="text"
        onClick={toggleLocale}
      >
        {iconOnly ? null : messages.language.toggleLabel}
      </Button>
    </Tooltip>
  );
}
