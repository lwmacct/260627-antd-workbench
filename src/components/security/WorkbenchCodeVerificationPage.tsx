import { Button } from "antd";
import { useWorkbenchLocale } from "../../locale/context";
import { WorkbenchCodeVerificationForm, type WorkbenchCodeVerificationFormProps } from "./WorkbenchCodeVerificationForm";
import { WorkbenchSecurityPage, type WorkbenchSecurityPageProps } from "./WorkbenchSecurityPage";

export interface WorkbenchCodeVerificationPageProps extends WorkbenchCodeVerificationFormProps {
  brand?: WorkbenchSecurityPageProps["brand"];
  panelClassName?: string;
  panelExtra?: WorkbenchSecurityPageProps["panelExtra"];
  onBack?(): void;
}

export function WorkbenchCodeVerificationPage({ brand, className, error, panelClassName, panelExtra, onBack, ...formProps }: WorkbenchCodeVerificationPageProps) {
  const { messages } = useWorkbenchLocale();
  const extra = panelExtra ?? (onBack ? <Button type="text" onClick={onBack}>{messages.verification.back}</Button> : undefined);
  return <WorkbenchSecurityPage brand={brand} className={className} error={error} panelClassName={panelClassName} panelExtra={extra}><WorkbenchCodeVerificationForm {...formProps} /></WorkbenchSecurityPage>;
}
