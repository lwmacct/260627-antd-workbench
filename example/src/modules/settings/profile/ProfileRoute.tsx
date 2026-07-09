import { Button, Descriptions } from "antd";
import {
  useWorkbenchVerification,
  WorkbenchPage,
  WorkbenchPanel,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";

export function ProfileRoute() {
  const text = useExampleText();
  const { verify } = useWorkbenchVerification();

  async function verifySensitiveAction() {
    await verify({
      description: text.security.verificationDescription(text.security.sensitiveAction),
      purpose: "sensitive-action",
      rememberOption: { defaultChecked: true, minutes: 15 },
      subject: text.security.sensitiveAction,
    });
  }

  return (
    <WorkbenchPage description={text.settings.profileDescription} title={text.settings.profile}>
      <WorkbenchPanel
        extra={
          <Button onClick={() => void verifySensitiveAction()}>
            {text.security.sensitiveAction}
          </Button>
        }
      >
        <Descriptions
          column={1}
          items={[
            { key: "name", label: text.settings.name, children: "Ada Lovelace" },
            { key: "email", label: text.settings.email, children: "ada@example.test" },
            { key: "role", label: text.settings.role, children: "Operator" },
          ]}
        />
      </WorkbenchPanel>
    </WorkbenchPage>
  );
}
