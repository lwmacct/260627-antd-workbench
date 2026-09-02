import type { Locale as AntdLocale } from "antd/es/locale";
import type { ReactNode } from "react";
import type { WorkbenchAppearanceSettingsLabels } from "../components/settings/WorkbenchAppearanceSettings";

export type WorkbenchLocale = "zh-CN" | "en-US";

export interface WorkbenchMessages {
  accessDenied: { description: ReactNode; title: ReactNode };
  account: { logout: string; openMenu: string };
  appearance: Required<WorkbenchAppearanceSettingsLabels>;
  appearanceControl: { open: string; title: ReactNode };
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
  identity: {
    contact: {
      code: ReactNode;
      codeRequired: string;
      confirm: ReactNode;
      email: ReactNode;
      emailInvalid: string;
      emailPlaceholder: string;
      emailRequired: string;
      phone: ReactNode;
      phoneInvalid: string;
      phonePlaceholder: string;
      phoneRequired: string;
      resend: (seconds: number) => ReactNode;
      send: ReactNode;
      unbind: ReactNode;
      unbindCancel: ReactNode;
      unbindConfirm: ReactNode;
      unbindDescription: ReactNode;
      unbindTitle: ReactNode;
      unavailable: ReactNode;
      unbound: ReactNode;
      verified: ReactNode;
      verifiedAt: (value: string) => ReactNode;
    };
    password: {
      confirm: ReactNode;
      confirmMismatch: string;
      confirmRequired: string;
      current: ReactNode;
      currentRequired: string;
      description: ReactNode;
      maxLength(value: number): string;
      minLength(value: number): string;
      new: ReactNode;
      newRequired: string;
      rejectCurrent: string;
      rejectWhitespace: string;
      save: ReactNode;
      saved: ReactNode;
      title: ReactNode;
    };
    profile: {
      account: ReactNode;
      avatarUrl: ReactNode;
      avatarUrlPlaceholder: string;
      description: ReactNode;
      displayName: ReactNode;
      displayNameRequired: string;
      save: ReactNode;
      saved: ReactNode;
      title: ReactNode;
      userId: ReactNode;
      username: ReactNode;
    };
    sessions: {
      createdAt: ReactNode;
      current: ReactNode;
      description: ReactNode;
      expiresAt: ReactNode;
      lastIp: ReactNode;
      lastSeenAt: ReactNode;
      loginIp: ReactNode;
      noSessions: ReactNode;
      revoke: ReactNode;
      revokeAll: ReactNode;
      revokeAllCancel: ReactNode;
      revokeAllDescription: ReactNode;
      revokeAllTitle: ReactNode;
      revokeCancel: ReactNode;
      revokeDescription: ReactNode;
      revokeTitle: ReactNode;
      revoked: ReactNode;
      revokedReason: ReactNode;
      title: ReactNode;
    };
    signIn: {
      description: ReactNode;
      identifier: ReactNode;
      identifierRequired: string;
      submit: ReactNode;
      title: ReactNode;
    };
    signUp: {
      description: ReactNode;
      submit: ReactNode;
      title: ReactNode;
    };
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
