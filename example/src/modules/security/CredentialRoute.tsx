import { ArrowLeftOutlined, CheckCircleFilled, DeploymentUnitOutlined, GithubOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
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
  const credentialAside = <CredentialPromo promo={text.security.promo} />;
  if (mode === "access-denied") return <WorkbenchAccessDeniedPage brand={{ name: "Workbench" }} identity={{ avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4", displayName: "The Octocat", provider: "GitHub", providerIcon: <GithubOutlined />, username: "octocat" }} panelExtra={panelExtra} onLogout={() => navigate(examplePaths.pages.oauth)} />;
  if (mode === "oauth") return <WorkbenchOAuthSignInPage brand={{ name: "Workbench" }} panelExtra={panelExtra} providers={[{ label: "GitHub", provider: "github" }, { label: "Google", provider: "google" }]} onSelectProvider={() => navigate(examplePaths.dashboard)} />;
  if (mode === "register") return <WorkbenchPasswordSignUpPage aside={credentialAside} challenge={exampleCredentialChallenge} createImageChallenge={createExampleImageChallenge} panelExtra={panelExtra} actions={<Button type="link" onClick={() => navigate(examplePaths.pages.login)}>{text.security.backToLogin}</Button>} onSubmit={() => navigate(examplePaths.dashboard)} />;
  if (mode === "token") return <TokenCredentialRoute panelExtra={panelExtra} />;
  return <WorkbenchPasswordSignInPage aside={credentialAside} challenge={exampleCredentialChallenge} createImageChallenge={createExampleImageChallenge} panelExtra={panelExtra} actions={<Button type="link" onClick={() => navigate(examplePaths.pages.register)}>Register</Button>} onSubmit={() => navigate(examplePaths.dashboard)} />;
}

function CredentialPromo({ promo }: { promo: { benefits: string[]; description: string; eyebrow: string; metric: string; metricLabel: string; title: string } }) {
  return (
    <div className="example-security-promo">
      <div className="example-security-promo__eyebrow">
        <span aria-hidden="true" className="example-security-promo__mark"><DeploymentUnitOutlined /></span>
        <Typography.Text>{promo.eyebrow}</Typography.Text>
      </div>
      <Typography.Title level={2}>{promo.title}</Typography.Title>
      <Typography.Paragraph type="secondary">{promo.description}</Typography.Paragraph>
      <ul className="example-security-promo__benefits">
        {promo.benefits.map((benefit) => (
          <li key={benefit}><CheckCircleFilled aria-hidden="true" /> <span>{benefit}</span></li>
        ))}
      </ul>
      <div className="example-security-promo__metric">
        <strong>{promo.metric}</strong>
        <Typography.Text type="secondary">{promo.metricLabel}</Typography.Text>
      </div>
    </div>
  );
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
