import { Button, Card, Descriptions } from "antd";
import { WorkbenchPage } from "@lwmacct/260627-antd-workbench";
import { useLocation, useNavigate } from "react-router-dom";
import { useExampleText } from "../../../shared/i18n";

export function ProfileRoute() {
  const text = useExampleText();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <WorkbenchPage description={text.settings.profileDescription} title={text.settings.profile}>
      <Card
        className="example-panel"
        extra={
          <Button
            onClick={() =>
              navigate("/security/verify", {
                state: {
                  purpose: "sensitive-action",
                  rememberMinutes: 15,
                  returnTo: location.pathname,
                  subject: text.security.sensitiveAction,
                },
              })
            }
          >
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
      </Card>
    </WorkbenchPage>
  );
}
