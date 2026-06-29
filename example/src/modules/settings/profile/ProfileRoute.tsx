import { Card, Descriptions } from "antd";
import { WorkbenchPage } from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";

export function ProfileRoute() {
  const text = useExampleText();

  return (
    <WorkbenchPage description={text.settings.profileDescription} title={text.settings.profile}>
      <Card className="example-panel">
        <Descriptions
          column={1}
          items={[
            { key: "name", label: text.settings.name, children: "Ada Lovelace" },
            { key: "email", label: text.settings.email, children: "ada@example.test" },
            { key: "role", label: text.settings.role, children: "Operator" },
          ]}
        />
      </Card>
    </WorkbenchPage>
  );
}
