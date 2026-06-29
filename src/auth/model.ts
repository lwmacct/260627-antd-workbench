import type { ReactNode } from "react";

export type WorkbenchAuthMode = "login" | "register";

export type WorkbenchChallengeProvider = "image" | "hcaptcha" | "turnstile";

export interface WorkbenchAuthChallengeConfig {
  provider: WorkbenchChallengeProvider;
  sitekey?: string;
}

export interface WorkbenchOAuthProvider {
  label: ReactNode;
  provider: string;
}

export interface WorkbenchAuthPublicConfig {
  challenge: WorkbenchAuthChallengeConfig;
  local: {
    loginEnabled: boolean;
    registrationEnabled: boolean;
  };
  oauth: {
    enabled: boolean;
    providers: WorkbenchOAuthProvider[];
  };
}

export interface WorkbenchImageChallenge {
  challengeId: string;
  expiresAt?: string;
  image: string;
  provider: "image";
}

export type WorkbenchAuthChallengeResponse =
  | { answer: string; challengeId: string; provider: "image" }
  | { provider: "hcaptcha"; token: string }
  | { provider: "turnstile"; token: string };

export interface WorkbenchAuthSubmitValues {
  challenge: WorkbenchAuthChallengeResponse;
  mode: WorkbenchAuthMode;
  password: string;
  username: string;
}

export const defaultWorkbenchAuthConfig: WorkbenchAuthPublicConfig = {
  challenge: { provider: "image" },
  local: { loginEnabled: true, registrationEnabled: true },
  oauth: { enabled: false, providers: [] },
};
