import { Switch } from "antd";
import Card from "antd/es/card/Card";
import { WorkbenchPage } from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";

export function NotificationsRoute() {
  const text = useExampleText();

  return (
    <WorkbenchPage
      description={text.settings.notificationsDescription}
      title={text.settings.notifications}
    >
      <Card className="example-panel" title={text.settings.notificationsCard}>
        <Switch defaultChecked /> {text.settings.operationsAlert}
      </Card>
    </WorkbenchPage>
  );
}
