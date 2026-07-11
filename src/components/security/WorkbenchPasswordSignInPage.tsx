import type { WorkbenchSecurityPageProps } from "./WorkbenchSecurityPage";
import { WorkbenchSecurityPage } from "./WorkbenchSecurityPage";
import {
  WorkbenchPasswordSignInForm,
  type WorkbenchPasswordSignInFormProps,
} from "./WorkbenchPasswordSignInForm";

export interface WorkbenchPasswordSignInPageProps extends WorkbenchPasswordSignInFormProps {
  brand?: WorkbenchSecurityPageProps["brand"];
  panelClassName?: string;
  panelExtra?: WorkbenchSecurityPageProps["panelExtra"];
}

export function WorkbenchPasswordSignInPage({ brand, className, error, panelClassName, panelExtra, ...formProps }: WorkbenchPasswordSignInPageProps) {
  return (
    <WorkbenchSecurityPage brand={brand} className={className} error={error} panelClassName={panelClassName} panelExtra={panelExtra}>
      <WorkbenchPasswordSignInForm {...formProps} />
    </WorkbenchSecurityPage>
  );
}
