import type { ReactNode } from "react";

export interface WorkbenchOAuthProvider {
  disabled?: boolean;
  icon?: ReactNode;
  label: ReactNode;
  provider: string;
}

export type WorkbenchHumanChallengeProvider = "hcaptcha" | "image" | "recaptcha" | "turnstile";

export interface WorkbenchHumanChallengeConfig {
  provider: WorkbenchHumanChallengeProvider;
  sitekey?: string;
}

export interface WorkbenchImageChallenge {
  challengeId: string;
  expiresAt?: string;
  image: string;
  provider: "image";
}

export type WorkbenchHumanChallengeResponse =
  | { answer: string; challengeId: string; provider: "image" }
  | { provider: "hcaptcha"; token: string }
  | { provider: "recaptcha"; token: string }
  | { provider: "turnstile"; token: string };

export interface WorkbenchPasswordSignInValues {
  challenge?: WorkbenchHumanChallengeResponse;
  password: string;
  username: string;
}

export interface WorkbenchPasswordSignUpValues extends WorkbenchPasswordSignInValues {
  confirmPassword: string;
}

export type WorkbenchCodeVerificationMethod = "email" | "recovery-code" | "sms" | "totp";
export type WorkbenchVerificationPurpose = "disable" | "login" | "reauth" | "sensitive-action" | "setup";

export interface WorkbenchVerificationRememberOption {
  defaultChecked?: boolean;
  enabled?: boolean;
  minutes: number;
}

export interface WorkbenchCodeVerificationRequest {
  description?: ReactNode;
  inputMode?: "numeric" | "text";
  kind: "code";
  method: WorkbenchCodeVerificationMethod;
  purpose: WorkbenchVerificationPurpose;
  rememberOption?: false | WorkbenchVerificationRememberOption;
  subject?: ReactNode;
  title?: ReactNode;
}

export interface WorkbenchPasskeyVerificationRequest {
  description?: ReactNode;
  kind: "passkey";
  purpose: WorkbenchVerificationPurpose;
  subject?: ReactNode;
  title?: ReactNode;
}

export type WorkbenchVerificationRequest = WorkbenchCodeVerificationRequest | WorkbenchPasskeyVerificationRequest;

export interface WorkbenchCodeVerificationValues {
  code: string;
  kind: "code";
  method: WorkbenchCodeVerificationMethod;
  purpose: WorkbenchVerificationPurpose;
  remember?: boolean;
  rememberForMinutes?: number;
}

export interface WorkbenchPasskeyVerificationValues {
  kind: "passkey";
  purpose: WorkbenchVerificationPurpose;
}

export type WorkbenchVerificationValues = WorkbenchCodeVerificationValues | WorkbenchPasskeyVerificationValues;
