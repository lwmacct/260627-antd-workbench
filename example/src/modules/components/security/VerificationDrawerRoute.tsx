import { SafetyCertificateOutlined } from "@ant-design/icons";
import { Alert, Button, Space } from "antd";
import { useState } from "react";
import {
  WorkbenchPage,
  WorkbenchCodeVerificationDrawer,
  type WorkbenchCodeVerificationValues,
  WorkbenchPanel,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";
import { assertExampleVerification } from "./demo";

export function VerificationDrawerRoute() {
  const text = useExampleText();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  function submit(values: WorkbenchCodeVerificationValues) {
    assertExampleVerification(values, String(text.security.verificationLabels.codeInvalid));
    setStatus(text.components.verificationSubmitted(values.method));
    setOpen(false);
  }

  return (
    <WorkbenchPage
      description={text.components.verificationDrawerDescription}
      title={text.components.verificationDrawer}
    >
      <WorkbenchPanel>
        <Space className="example-components-actions" orientation="vertical" size={12}>
          <Button
            icon={<SafetyCertificateOutlined />}
            type="primary"
            onClick={() => setOpen(true)}
          >
            {text.components.openVerificationDrawer}
          </Button>
          {status ? <Alert message={status} showIcon type="success" /> : null}
        </Space>
      </WorkbenchPanel>
      <WorkbenchCodeVerificationDrawer
        description={text.security.sensitiveActionDescription}
        open={open}
        method="totp"
        purpose="sensitive-action"
        rememberOption={{ minutes: text.security.verificationRememberMinutes }}
        title={text.security.sensitiveAction}
        onClose={() => setOpen(false)}
        onSubmit={submit}
      />
    </WorkbenchPage>
  );
}
