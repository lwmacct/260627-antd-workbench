import { SafetyCertificateOutlined } from "@ant-design/icons";
import { Alert, Button, Space } from "antd";
import { useState } from "react";
import {
  WorkbenchPage,
  WorkbenchVerificationModal,
  type WorkbenchVerificationSubmitValues,
  WorkbenchPanel,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";
import { assertExampleVerification } from "./demo";

export function VerificationModalRoute() {
  const text = useExampleText();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  function submit(values: WorkbenchVerificationSubmitValues) {
    assertExampleVerification(values, String(text.security.verificationLabels.codeInvalid));
    setStatus(text.components.verificationSubmitted(values.method));
    setOpen(false);
  }

  return (
    <WorkbenchPage
      description={text.components.verificationModalDescription}
      title={text.components.verificationModal}
    >
      <WorkbenchPanel>
        <Space className="example-components-actions" direction="vertical" size={12}>
          <Button
            icon={<SafetyCertificateOutlined />}
            type="primary"
            onClick={() => setOpen(true)}
          >
            {text.components.openVerificationModal}
          </Button>
          {status ? <Alert message={status} showIcon type="success" /> : null}
        </Space>
      </WorkbenchPanel>
      <WorkbenchVerificationModal
        description={text.security.sensitiveActionDescription}
        labels={text.security.verificationLabels}
        open={open}
        purpose="sensitive-action"
        rememberOption={{ minutes: text.security.verificationRememberMinutes }}
        title={text.security.sensitiveAction}
        onCancel={() => setOpen(false)}
        onSubmit={submit}
      />
    </WorkbenchPage>
  );
}
