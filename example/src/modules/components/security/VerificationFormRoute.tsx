import { Alert } from "antd";
import { useState } from "react";
import {
  WorkbenchPage,
  WorkbenchCodeVerificationForm,
  type WorkbenchCodeVerificationValues,
  WorkbenchPanel,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";
import { assertExampleVerification } from "./demo";

export function VerificationFormRoute() {
  const text = useExampleText();
  const [status, setStatus] = useState("");

  function submit(values: WorkbenchCodeVerificationValues) {
    assertExampleVerification(values, String(text.security.verificationLabels.codeInvalid));
    setStatus(text.components.verificationSubmitted(values.method));
  }

  return (
    <WorkbenchPage
      description={text.components.verificationFormDescription}
      title={text.components.verificationForm}
    >
      <WorkbenchPanel>
        <WorkbenchCodeVerificationForm
          description={text.security.sensitiveActionDescription}
          method="totp"
          purpose="sensitive-action"
          rememberOption={{
            defaultChecked: true,
            minutes: text.security.verificationRememberMinutes,
          }}
          title={text.security.sensitiveAction}
          onSubmit={submit}
        />
      </WorkbenchPanel>
      {status ? <Alert message={status} showIcon type="success" /> : null}
    </WorkbenchPage>
  );
}
