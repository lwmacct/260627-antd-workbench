import { Space, message } from "antd";
import { WorkbenchPage, WorkbenchPanel, WorkbenchPasswordSignInForm, WorkbenchPasswordSignUpForm } from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";
import { createExampleImageChallenge } from "./demo";

export function CredentialFormRoute() {
  const text = useExampleText();
  return <WorkbenchPage description={text.components.credentialFormDescription} title={text.components.credentialForm}>
    <Space align="start" size={16} wrap>
      <WorkbenchPanel><WorkbenchPasswordSignInForm challenge={{ provider: "image" }} createImageChallenge={createExampleImageChallenge} onSubmit={(values) => void message.success(text.components.credentialSubmitted("login", values.username))} /></WorkbenchPanel>
      <WorkbenchPanel><WorkbenchPasswordSignUpForm onSubmit={(values) => void message.success(text.components.credentialSubmitted("register", values.username))} /></WorkbenchPanel>
    </Space>
  </WorkbenchPage>;
}
