import { Alert } from "antd";
import { useState } from "react";
import {
  WorkbenchCredentialForm,
  WorkbenchPage,
  type WorkbenchCredentialMode,
  type WorkbenchCredentialSubmitValues,
  WorkbenchPanel,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";
import { createExampleImageChallenge, exampleCredentialConfig } from "./demo";

export function CredentialFormRoute() {
  const text = useExampleText();
  const [mode, setMode] = useState<WorkbenchCredentialMode>("login");
  const [status, setStatus] = useState("");

  function submit(values: WorkbenchCredentialSubmitValues) {
    setStatus(text.components.credentialSubmitted(values.mode, values.username));
  }

  return (
    <WorkbenchPage
      description={text.components.credentialFormDescription}
      title={text.components.credentialForm}
    >
      <WorkbenchPanel>
        <WorkbenchCredentialForm
          config={exampleCredentialConfig}
          createImageChallenge={createExampleImageChallenge}
          labels={text.security.credentialLabels}
          mode={mode}
          onModeChange={setMode}
          onOAuthLogin={(provider) =>
            setStatus(text.components.oauthSelected(String(provider.label)))
          }
          onSubmit={submit}
        />
      </WorkbenchPanel>
      {status ? <Alert message={status} showIcon type="success" /> : null}
    </WorkbenchPage>
  );
}
