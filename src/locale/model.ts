import type { Locale as AntdLocale } from "antd/es/locale";
import type { WorkbenchAppearanceSettingsLabels } from "../components/settings/WorkbenchAppearanceSettings";
import type {
  WorkbenchChallengeFieldLabels,
  WorkbenchCredentialLabels,
  WorkbenchOAuthButtonsLabels,
  WorkbenchVerificationLabels,
} from "../components/security/labels";

export type WorkbenchLocale = "zh-CN" | "en-US";

export interface WorkbenchMessages {
  account: { logout: string; menu: string };
  appearance: Required<WorkbenchAppearanceSettingsLabels>;
  auth: { checking: string; retry: string; signingIn: string };
  challenge: Required<WorkbenchChallengeFieldLabels>;
  credential: Required<WorkbenchCredentialLabels>;
  language: { switchLanguage: string; toggleLabel: string };
  navigation: { sectionNavigation: string };
  oauth: Required<WorkbenchOAuthButtonsLabels>;
  theme: { switchTheme: string; switchToDark: string; switchToLight: string };
  verification: Required<WorkbenchVerificationLabels>;
}

export interface WorkbenchLocaleContextValue {
  antdLocale: AntdLocale;
  locale: WorkbenchLocale;
  messages: WorkbenchMessages;
  setLocale(locale: WorkbenchLocale): void;
  toggleLocale(): void;
}
