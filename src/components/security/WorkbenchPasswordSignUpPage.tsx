import type { WorkbenchSecurityPageProps } from "./WorkbenchSecurityPage";
import { WorkbenchSecurityPage } from "./WorkbenchSecurityPage";
import { WorkbenchPasswordSignUpForm, type WorkbenchPasswordSignUpFormProps } from "./WorkbenchPasswordSignUpForm";

export interface WorkbenchPasswordSignUpPageProps extends WorkbenchPasswordSignUpFormProps {
  aside?: WorkbenchSecurityPageProps["aside"];
  brand?: WorkbenchSecurityPageProps["brand"];
  panelClassName?: string;
  panelExtra?: WorkbenchSecurityPageProps["panelExtra"];
}

export function WorkbenchPasswordSignUpPage({ aside, brand, className, error, panelClassName, panelExtra, ...formProps }: WorkbenchPasswordSignUpPageProps) {
  return <WorkbenchSecurityPage aside={aside} brand={brand} className={className} error={error} panelClassName={panelClassName} panelExtra={panelExtra}><WorkbenchPasswordSignUpForm {...formProps} /></WorkbenchSecurityPage>;
}
