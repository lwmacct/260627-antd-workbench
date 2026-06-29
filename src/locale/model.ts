import type { ReactNode } from "react";
import type { Locale as AntdLocale } from "antd/es/locale";

export interface WorkbenchLocaleOption {
  antdLocale?: AntdLocale;
  documentLang?: string;
  label: ReactNode;
  shortLabel?: ReactNode;
  value: string;
}

export interface WorkbenchLocaleOptions {
  antdLocale?: AntdLocale;
  defaultValue?: string;
  documentLang?: string | ((locale: string) => string);
  options?: WorkbenchLocaleOption[];
  storageKey?: false | string;
  value?: string;
  onChange?(locale: string): void;
}

export interface WorkbenchLocaleContextValue {
  antdLocale?: AntdLocale;
  locale: string;
  options: WorkbenchLocaleOption[];
  setLocale(locale: string): void;
  toggleLocale(): void;
}

