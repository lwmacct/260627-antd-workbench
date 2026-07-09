import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import type {
  WorkbenchCredentialConfig,
  WorkbenchImageChallenge,
  WorkbenchVerificationSubmitValues,
} from "@lwmacct/260627-antd-workbench";

export const exampleCredentialConfig: WorkbenchCredentialConfig = {
  challenge: { provider: "image" },
  local: { loginEnabled: true, registrationEnabled: true },
  oauth: {
    providers: [
      { icon: <GithubOutlined />, label: "GitHub", provider: "github" },
      { icon: <GoogleOutlined />, label: "Google", provider: "google" },
    ],
  },
};

export async function createExampleImageChallenge(): Promise<WorkbenchImageChallenge> {
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

export function assertExampleVerification(
  values: WorkbenchVerificationSubmitValues,
  invalidMessage: string,
) {
  if (!/^\d{6}$/.test(values.code ?? "")) {
    throw new Error(invalidMessage);
  }
}
