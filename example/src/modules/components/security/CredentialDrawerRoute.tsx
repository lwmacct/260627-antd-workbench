import { LoginOutlined } from "@ant-design/icons";
import { Alert, Button, Space } from "antd";
import { useState } from "react";
import {
  WorkbenchCredentialDrawer,
  WorkbenchPage,
  type WorkbenchCredentialMode,
  type WorkbenchCredentialSubmitValues,
  WorkbenchPanel,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";
import { createExampleImageChallenge, exampleCredentialConfig } from "./demo";

export function CredentialDrawerRoute() {
  const text = useExampleText();
  const [mode, setMode] = useState<WorkbenchCredentialMode>("login");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  function submit(values: WorkbenchCredentialSubmitValues) {
    setStatus(text.components.credentialSubmitted(values.mode, values.username));
    setOpen(false);
  }

  return (
    <WorkbenchPage
      description={text.components.credentialDrawerDescription}
      title={text.components.credentialDrawer}
    >
      <WorkbenchPanel>
        <Space className="example-components-actions" direction="vertical" size={12}>
          <Button icon={<LoginOutlined />} type="primary" onClick={() => setOpen(true)}>
            {text.components.openCredentialDrawer}
          </Button>
          {status ? <Alert message={status} showIcon type="success" /> : null}
        </Space>
      </WorkbenchPanel>
      <WorkbenchCredentialDrawer
        config={exampleCredentialConfig}
        createImageChallenge={createExampleImageChallenge}
        labels={text.security.credentialLabels}
        mode={mode}
        open={open}
        onClose={() => setOpen(false)}
        onModeChange={setMode}
        onSubmit={submit}
      />
    </WorkbenchPage>
  );
}
