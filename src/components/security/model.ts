import type { ReactNode } from "react";

export type WorkbenchCredentialMode = "login" | "register";

export type WorkbenchChallengeProvider = "hcaptcha" | "image" | "recaptcha" | "turnstile";

export interface WorkbenchChallengeConfig {
  provider: WorkbenchChallengeProvider;
  sitekey?: string;
}

export interface WorkbenchOAuthProvider {
  disabled?: boolean;
  icon?: ReactNode;
  label: ReactNode;
  provider: string;
}

export interface WorkbenchCredentialConfig {
  challenge?: false | WorkbenchChallengeConfig;
  local?: false | {
    loginEnabled?: boolean;
    registrationEnabled?: boolean;
  };
  oauth?: false | {
    providers: WorkbenchOAuthProvider[];
  };
}

export interface WorkbenchImageChallenge {
  challengeId: string;
  expiresAt?: string;
  image: string;
  provider: "image";
}

export type WorkbenchChallengeResponse =
  | { answer: string; challengeId: string; provider: "image" }
  | { provider: "hcaptcha"; token: string }
  | { provider: "recaptcha"; token: string }
  | { provider: "turnstile"; token: string };

export interface WorkbenchCredentialSubmitValues {
  challenge?: WorkbenchChallengeResponse;
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

export const defaultWorkbenchCredentialConfig: Required<WorkbenchCredentialConfig> = {
  challenge: { provider: "image" },
  local: { loginEnabled: true, registrationEnabled: true },
  oauth: { providers: [] },
};
