import type { ReactNode } from "react";

export interface WorkbenchChallengeFieldLabels {
  captcha?: ReactNode;
  captchaCreateFailed?: string;
  refresh?: ReactNode;
  remoteChallengeConfigured?: ReactNode;
  remoteChallengeMissingSitekey?: ReactNode;
  remoteChallengeUnsupported?: ReactNode;
}

export interface WorkbenchOAuthButtonsLabels {
  loginWith?: (label: ReactNode) => ReactNode;
}

export interface WorkbenchCredentialLabels {
  challenge?: WorkbenchChallengeFieldLabels;
  confirmPassword?: ReactNode;
  confirmPasswordRequired?: string;
  confirmPasswordMismatch?: string;
  disabledLocalLogin?: ReactNode;
  disabledRegistration?: ReactNode;
  loginDescription?: ReactNode;
  loginSubmit?: ReactNode;
  loginTitle?: ReactNode;
  modeSwitchLogin?: ReactNode;
  modeSwitchLoginPrefix?: ReactNode;
  modeSwitchRegister?: ReactNode;
  modeSwitchRegisterPrefix?: ReactNode;
  oauth?: WorkbenchOAuthButtonsLabels;
  password?: ReactNode;
  passwordContainsUsername?: string;
  passwordMinLength?: string;
  passwordRequired?: string;
  registerDescription?: ReactNode;
  registerSubmit?: ReactNode;
  registerTitle?: ReactNode;
  username?: ReactNode;
  usernameRequired?: string;
}

export interface WorkbenchVerificationLabels {
  back?: ReactNode;
  code?: ReactNode;
  codeInvalid?: string;
  codeRequired?: string;
  description?: ReactNode;
  remember?: ReactNode | ((minutes: number) => ReactNode);
  submit?: ReactNode;
  title?: ReactNode;
  useAnotherMethod?: ReactNode;
  useRecoveryCode?: ReactNode;
}
