import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import {
  WorkbenchCredentialPage,
  type WorkbenchCredentialMode,
  type WorkbenchCredentialSubmitValues,
  type WorkbenchImageChallenge,
} from "@lwmacct/260627-antd-workbench";
import { Link, useNavigate } from "react-router-dom";
import { examplePaths } from "../../app/router/navigation";
import { useExampleText } from "../../shared/i18n";

const verificationRequiredUsers = new Set(["ada", "ada@example.test", "admin"]);

export function CredentialRoute({ mode }: { mode: WorkbenchCredentialMode }) {
  const text = useExampleText();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function submit(values: WorkbenchCredentialSubmitValues) {
    if (!values.challenge || values.challenge.provider !== "image") {
      setError(text.security.challengeTypeError);
      return;
    }

    setError("");
    if (values.mode === "login" && requiresVerification(values.username)) {
      navigate("/security/verify", {
        state: {
          purpose: "login",
          rememberMinutes: text.security.verificationRememberMinutes,
          returnTo: examplePaths.dashboard,
          subject: values.username,
        },
      });
      return;
    }

    navigate(examplePaths.dashboard);
  }

  return (
    <WorkbenchCredentialPage
      config={{
        challenge: { provider: "image" },
        local: { loginEnabled: true, registrationEnabled: true },
        oauth: {
          providers: [
            { label: "GitHub", provider: "github" },
            { label: "Google", provider: "google" },
          ],
        },
      }}
      createImageChallenge={createImageChallenge}
      error={error}
      labels={text.security.credentialLabels}
      mode={mode}
      panelExtra={
        <Button
          className="example-security-back"
          icon={<ArrowLeftOutlined />}
          type="text"
          onClick={() => navigate(examplePaths.dashboard)}
        >
          {text.security.back}
        </Button>
      }
      renderModeSwitch={({ children, targetMode }) => (
        <Link to={`/security/${targetMode}`}>{children}</Link>
      )}
      onModeChange={(nextMode) => navigate(`/security/${nextMode}`)}
      onOAuthLogin={() => navigate(examplePaths.dashboard)}
      onSubmit={submit}
    />
  );
}

function requiresVerification(username: string): boolean {
  return verificationRequiredUsers.has(username.trim().toLowerCase());
}

async function createImageChallenge(): Promise<WorkbenchImageChallenge> {
  const code = Math.random().toString(36).slice(2, 6).toUpperCase();
  const image = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="32" viewBox="0 0 150 32">
      <rect width="150" height="32" fill="#111827"/>
      <path d="M8 25 L142 7" stroke="#2388ff" stroke-width="2" opacity=".7"/>
      <text x="75" y="22" text-anchor="middle" font-family="monospace" font-size="18" font-weight="700" fill="#fff">${code}</text>
    </svg>
  `);

  return {
    challengeId: crypto.randomUUID(),
    image: `data:image/svg+xml;charset=UTF-8,${image}`,
    provider: "image",
  };
}
