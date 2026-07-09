import { Alert } from "antd";
import Card from "antd/es/card/Card";
import { useState } from "react";
import {
  WorkbenchPage,
  WorkbenchVerificationForm,
  type WorkbenchVerificationSubmitValues,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";
import { assertExampleVerification } from "./demo";

export function VerificationFormRoute() {
  const text = useExampleText();
  const [status, setStatus] = useState("");

  function submit(values: WorkbenchVerificationSubmitValues) {
    assertExampleVerification(values, String(text.security.verificationLabels.codeInvalid));
    setStatus(text.components.verificationSubmitted(values.method));
  }

  return (
    <WorkbenchPage
      description={text.components.verificationFormDescription}
      title={text.components.verificationForm}
    >
      <Card className="example-panel">
        <WorkbenchVerificationForm
          description={text.security.sensitiveActionDescription}
          labels={text.security.verificationLabels}
          purpose="sensitive-action"
          rememberOption={{
            defaultChecked: true,
            minutes: text.security.verificationRememberMinutes,
          }}
          title={text.security.sensitiveAction}
          onSubmit={submit}
        />
      </Card>
      {status ? <Alert className="example-panel" message={status} showIcon type="success" /> : null}
    </WorkbenchPage>
  );
}
