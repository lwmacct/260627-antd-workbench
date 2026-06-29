import { useState } from "react";
import {
  WorkbenchAuthScreen,
  type WorkbenchAuthMode,
  type WorkbenchAuthSubmitValues,
  type WorkbenchImageChallenge,
} from "@lwmacct/260627-antd-workbench";
import { Link, useNavigate } from "react-router-dom";
import { useExampleText } from "../../shared/i18n";

export function AuthRoute({ mode }: { mode: WorkbenchAuthMode }) {
  const text = useExampleText();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function submit(values: WorkbenchAuthSubmitValues) {
    setError(values.challenge.provider === "image" ? "" : text.auth.challengeTypeError);
  }

  return (
    <WorkbenchAuthScreen
      createImageChallenge={createImageChallenge}
      error={error}
      labels={text.auth.labels}
      mode={mode}
      renderModeSwitch={({ children, targetMode }) => (
        <Link to={`/auth/${targetMode}`}>{children}</Link>
      )}
      onModeChange={(nextMode) => navigate(`/auth/${nextMode}`)}
      onSubmit={submit}
    />
  );
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
