import { LockOutlined } from "@ant-design/icons";
import { Alert, Button, Space, Typography } from "antd";
import { useState } from "react";
import {
  WorkbenchPage,
  WorkbenchVerificationProvider,
  useWorkbenchVerification,
  type WorkbenchVerificationResult,
  WorkbenchPanel,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";
import { assertExampleVerification } from "./demo";

export function VerificationProviderRoute() {
  const text = useExampleText();

  return (
    <WorkbenchPage
      description={text.components.verificationProviderDescription}
      title={text.components.verificationProvider}
    >
      <WorkbenchVerificationProvider
        onVerify={(values) =>
          assertExampleVerification(values, String(text.security.verificationLabels.codeInvalid))
        }
      >
        <VerificationProviderCard />
      </WorkbenchVerificationProvider>
    </WorkbenchPage>
  );
}

function VerificationProviderCard() {
  const text = useExampleText();
  const { verify } = useWorkbenchVerification();
  const [result, setResult] = useState<WorkbenchVerificationResult>();

  async function requestVerification() {
    setResult(
      await verify({
        description: text.security.sensitiveActionDescription,
        kind: "code",
        method: "totp",
        purpose: "sensitive-action",
        rememberOption: {
          defaultChecked: true,
          minutes: text.security.verificationRememberMinutes,
        },
        subject: text.components.verificationProvider,
        title: text.security.sensitiveAction,
      }),
    );
  }

  return (
    <WorkbenchPanel>
      <Space className="example-components-actions" orientation="vertical" size={12}>
        <Typography.Text type="secondary">
          {text.components.verificationProviderDescription}
        </Typography.Text>
        <Button icon={<LockOutlined />} type="primary" onClick={requestVerification}>
          {text.security.sensitiveAction}
        </Button>
        {result?.status === "verified" ? (
          <Alert message={text.security.sensitiveActionVerified} showIcon type="success" />
        ) : null}
        {result?.status === "cancelled" ? (
          <Alert message={text.security.sensitiveActionCancelled} showIcon type="info" />
        ) : null}
      </Space>
    </WorkbenchPanel>
  );
}
