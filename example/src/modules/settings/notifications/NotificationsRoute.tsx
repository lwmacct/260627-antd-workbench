import { Switch } from "antd";
import { WorkbenchPage, WorkbenchPanel } from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";

export function NotificationsRoute() {
  const text = useExampleText();

  return (
    <WorkbenchPage
      description={text.settings.notificationsDescription}
      title={text.settings.notifications}
    >
      <WorkbenchPanel title={text.settings.notificationsCard}>
        <Switch defaultChecked /> {text.settings.operationsAlert}
      </WorkbenchPanel>
    </WorkbenchPage>
  );
}
