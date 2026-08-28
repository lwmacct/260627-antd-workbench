import { ArrowLeftOutlined, GithubOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { ReactNode } from "react";
import { WorkbenchAccessDeniedPage, WorkbenchOAuthSignInPage, WorkbenchPasswordSignInPage, WorkbenchPasswordSignUpPage, WorkbenchTokenSignInPage } from "@lwmacct/260627-antd-workbench";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { examplePaths } from "../../app/router/navigation";
import { useExampleText } from "../../shared/i18n";
import { createExampleImageChallenge } from "../../shared/securityDemo";

const exampleCredentialChallenge = { provider: "image" } as const;

export function CredentialRoute({ mode }: { mode: "access-denied" | "login" | "oauth" | "register" | "token" }) {
  const text = useExampleText();
  const navigate = useNavigate();
  const panelExtra = <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => navigate(examplePaths.components)}>{text.security.back}</Button>;
  if (mode === "access-denied") return <WorkbenchAccessDeniedPage brand={{ name: "Workbench" }} identity={{ avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4", displayName: "The Octocat", provider: "GitHub", providerIcon: <GithubOutlined />, username: "octocat" }} panelExtra={panelExtra} onLogout={() => navigate(examplePaths.pages.oauth)} />;
  if (mode === "oauth") return <WorkbenchOAuthSignInPage brand={{ name: "Workbench" }} panelExtra={panelExtra} providers={[{ label: "GitHub", provider: "github" }, { label: "Google", provider: "google" }]} onSelectProvider={() => navigate(examplePaths.dashboard)} />;
  if (mode === "register") return <WorkbenchPasswordSignUpPage challenge={exampleCredentialChallenge} createImageChallenge={createExampleImageChallenge} panelExtra={panelExtra} actions={<Button type="link" onClick={() => navigate(examplePaths.pages.login)}>{text.security.backToLogin}</Button>} onSubmit={() => navigate(examplePaths.dashboard)} />;
  if (mode === "token") return <TokenCredentialRoute panelExtra={panelExtra} />;
  return <WorkbenchPasswordSignInPage challenge={exampleCredentialChallenge} createImageChallenge={createExampleImageChallenge} panelExtra={panelExtra} actions={<Button type="link" onClick={() => navigate(examplePaths.pages.register)}>Register</Button>} onSubmit={() => navigate(examplePaths.dashboard)} />;
}

function TokenCredentialRoute({ panelExtra }: { panelExtra: ReactNode }) {
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
    panelExtra={panelExtra}
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
