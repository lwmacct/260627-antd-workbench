import { LoginOutlined } from "@ant-design/icons";
import { Alert, Button, Space } from "antd";
import { useState } from "react";
import {
  WorkbenchCredentialModal,
  WorkbenchPage,
  type WorkbenchCredentialMode,
  type WorkbenchCredentialSubmitValues,
  WorkbenchPanel,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";
import { createExampleImageChallenge, exampleCredentialConfig } from "./demo";

export function CredentialModalRoute() {
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
      description={text.components.credentialModalDescription}
      title={text.components.credentialModal}
    >
      <WorkbenchPanel>
        <Space className="example-components-actions" direction="vertical" size={12}>
          <Button icon={<LoginOutlined />} type="primary" onClick={() => setOpen(true)}>
            {text.components.openCredentialModal}
          </Button>
          {status ? <Alert message={status} showIcon type="success" /> : null}
        </Space>
      </WorkbenchPanel>
      <WorkbenchCredentialModal
        config={exampleCredentialConfig}
        createImageChallenge={createExampleImageChallenge}
        mode={mode}
        open={open}
        onCancel={() => setOpen(false)}
        onModeChange={setMode}
        onSubmit={submit}
      />
    </WorkbenchPage>
  );
}
