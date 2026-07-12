import { ArrowLeftOutlined, GithubOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { WorkbenchAccessDeniedPage, WorkbenchOAuthSignInPage, WorkbenchPasswordSignInPage, WorkbenchPasswordSignUpPage } from "@lwmacct/260627-antd-workbench";
import { useNavigate } from "react-router-dom";
import { examplePaths } from "../../app/router/navigation";
import { useExampleText } from "../../shared/i18n";

export function CredentialRoute({ mode }: { mode: "access-denied" | "login" | "oauth" | "register" }) {
  const text = useExampleText();
  const navigate = useNavigate();
  const panelExtra = <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => navigate(examplePaths.dashboard)}>{text.security.back}</Button>;
  if (mode === "access-denied") return <WorkbenchAccessDeniedPage brand={{ name: "Workbench" }} identity={{ avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4", displayName: "The Octocat", provider: "GitHub", providerIcon: <GithubOutlined />, username: "octocat" }} onLogout={() => navigate("/security/oauth")} />;
  if (mode === "oauth") return <WorkbenchOAuthSignInPage brand={{ name: "Workbench" }} providers={[{ label: "GitHub", provider: "github" }, { label: "Google", provider: "google" }]} onSelectProvider={() => navigate(examplePaths.dashboard)} />;
  if (mode === "register") return <WorkbenchPasswordSignUpPage panelExtra={panelExtra} actions={<Button type="link" onClick={() => navigate("/security/login")}>{text.security.backToLogin}</Button>} onSubmit={() => navigate(examplePaths.dashboard)} />;
  return <WorkbenchPasswordSignInPage panelExtra={panelExtra} actions={<Button type="link" onClick={() => navigate("/security/register")}>Register</Button>} onSubmit={() => navigate(examplePaths.dashboard)} />;
}
