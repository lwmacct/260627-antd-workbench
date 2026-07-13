import type { Locale as AntdLocale } from "antd/es/locale";
import type { ReactNode } from "react";
import type { WorkbenchAppearanceSettingsLabels } from "../components/settings/WorkbenchAppearanceSettings";

export type WorkbenchLocale = "zh-CN" | "en-US";

export interface WorkbenchMessages {
  accessDenied: { description: ReactNode; title: ReactNode };
  account: { logout: string; openMenu: string };
  appearance: Required<WorkbenchAppearanceSettingsLabels>;
  auth: { alternative: ReactNode; retry: string; signingIn: string };
  codeVerification: {
    code: ReactNode;
    codeRequired: string;
    description: ReactNode;
    remember(minutes: number): ReactNode;
    submit: ReactNode;
    title: ReactNode;
  };
  humanChallenge: {
    createFailed: string;
    imageAlt: string;
    label: ReactNode;
    missingSitekey: ReactNode;
    refresh: ReactNode;
    unsupportedRemoteProvider: ReactNode;
  };
  language: { switchLanguage: string };
  navigation: { sectionNavigation: string };
  oauth: { loginWith(label: ReactNode): ReactNode };
  passkeyVerification: { description: ReactNode; submit: ReactNode; title: ReactNode };
  password: {
    confirmPassword: ReactNode;
    confirmPasswordMismatch: string;
    confirmPasswordRequired: string;
    password: ReactNode;
    passwordMinLength: string;
    passwordRequired: string;
    username: ReactNode;
    usernameRequired: string;
  };
  passwordSignIn: { description: ReactNode; submit: ReactNode; title: ReactNode };
  passwordSignUp: { description: ReactNode; submit: ReactNode; title: ReactNode };
  theme: { switchTheme: string; switchToDark: string; switchToLight: string };
  tokenSignIn: {
    description: ReactNode;
    submit: ReactNode;
    title: ReactNode;
    token: ReactNode;
    tokenRequired: string;
  };
  verification: { back: ReactNode };
}

export interface WorkbenchLocaleContextValue {
  antdLocale: AntdLocale;
  locale: WorkbenchLocale;
  messages: WorkbenchMessages;
  setLocale(locale: WorkbenchLocale): void;
  toggleLocale(): void;
}
