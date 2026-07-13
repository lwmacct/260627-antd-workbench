import { ArrowLeftOutlined, GithubOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { WorkbenchAccessDeniedPage, WorkbenchOAuthSignInPage, WorkbenchPasswordSignInPage, WorkbenchPasswordSignUpPage, WorkbenchTokenSignInPage } from "@lwmacct/260627-antd-workbench";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { examplePaths } from "../../app/router/navigation";
import { useExampleText } from "../../shared/i18n";

export function CredentialRoute({ mode }: { mode: "access-denied" | "login" | "oauth" | "register" | "token" }) {
  const text = useExampleText();
  const navigate = useNavigate();
  const panelExtra = <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => navigate(examplePaths.dashboard)}>{text.security.back}</Button>;
  if (mode === "access-denied") return <WorkbenchAccessDeniedPage brand={{ name: "Workbench" }} identity={{ avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4", displayName: "The Octocat", provider: "GitHub", providerIcon: <GithubOutlined />, username: "octocat" }} onLogout={() => navigate("/security/oauth")} />;
  if (mode === "oauth") return <WorkbenchOAuthSignInPage brand={{ name: "Workbench" }} providers={[{ label: "GitHub", provider: "github" }, { label: "Google", provider: "google" }]} onSelectProvider={() => navigate(examplePaths.dashboard)} />;
  if (mode === "register") return <WorkbenchPasswordSignUpPage panelExtra={panelExtra} actions={<Button type="link" onClick={() => navigate("/security/login")}>{text.security.backToLogin}</Button>} onSubmit={() => navigate(examplePaths.dashboard)} />;
  if (mode === "token") return <TokenCredentialRoute />;
  return <WorkbenchPasswordSignInPage panelExtra={panelExtra} actions={<Button type="link" onClick={() => navigate("/security/register")}>Register</Button>} onSubmit={() => navigate(examplePaths.dashboard)} />;
}

function TokenCredentialRoute() {
  const text = useExampleText();
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [pendingProvider, setPendingProvider] = useState<string>();
  async function submit() {
    setError(undefined);
    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 600));
    setLoading(false);
    setError(text.security.tokenRejected);
  }
  return <WorkbenchTokenSignInPage
    error={error}
    loading={loading}
    oauth={{
      pendingProvider,
      providers: [{ label: "GitHub", provider: "github" }],
      onSelectProvider: (provider) => {
        setPendingProvider(provider.provider);
        window.setTimeout(() => navigate(examplePaths.dashboard), 600);
      },
    }}
    retry={Boolean(error)}
    onRetry={() => setError(undefined)}
    onSubmit={submit}
  />;
}
