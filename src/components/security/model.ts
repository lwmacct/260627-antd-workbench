import type { ReactNode } from "react";

export type WorkbenchCredentialMode = "login" | "register";

export type WorkbenchChallengeProvider = "image" | "hcaptcha" | "turnstile";

export interface WorkbenchCredentialChallengeConfig {
  provider: WorkbenchChallengeProvider;
  sitekey?: string;
}

export interface WorkbenchOAuthProvider {
  label: ReactNode;
  provider: string;
}

export interface WorkbenchCredentialConfig {
  challenge: WorkbenchCredentialChallengeConfig;
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

export type WorkbenchCredentialChallengeResponse =
  | { answer: string; challengeId: string; provider: "image" }
  | { provider: "hcaptcha"; token: string }
  | { provider: "turnstile"; token: string };

export interface WorkbenchCredentialSubmitValues {
  challenge: WorkbenchCredentialChallengeResponse;
  mode: WorkbenchCredentialMode;
  password: string;
  username: string;
}

export type WorkbenchVerificationPurpose =
  | "disable"
  | "login"
  | "reauth"
  | "sensitive-action"
  | "setup";

export type WorkbenchVerificationMethod =
  | "email"
  | "passkey"
  | "recovery-code"
  | "sms"
  | "totp";

export interface WorkbenchVerificationRememberOption {
  defaultChecked?: boolean;
  enabled?: boolean;
  minutes: number;
}

export interface WorkbenchVerificationSubmitValues {
  code?: string;
  method: WorkbenchVerificationMethod;
  purpose: WorkbenchVerificationPurpose;
  remember?: boolean;
  rememberForMinutes?: number;
}

export const defaultWorkbenchCredentialConfig: WorkbenchCredentialConfig = {
  challenge: { provider: "image" },
  local: { loginEnabled: true, registrationEnabled: true },
  oauth: { enabled: false, providers: [] },
};
