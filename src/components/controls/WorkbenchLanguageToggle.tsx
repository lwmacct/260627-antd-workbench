import { GlobalOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useWorkbenchLocale } from "../../locale/context";

export function WorkbenchLanguageToggle() {
  const { messages, toggleLocale } = useWorkbenchLocale();

  return (
    <Tooltip title={messages.language.switchLanguage}>
      <Button
        aria-label={messages.language.switchLanguage}
        className="wb-header-action"
        icon={<GlobalOutlined />}
        onClick={toggleLocale}
      />
    </Tooltip>
  );
}
