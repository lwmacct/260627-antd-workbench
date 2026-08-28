import type { WorkbenchSecurityPageProps } from "./WorkbenchSecurityPage";
import { WorkbenchSecurityPage } from "./WorkbenchSecurityPage";
import {
  WorkbenchPasswordSignInForm,
  type WorkbenchPasswordSignInFormProps,
} from "./WorkbenchPasswordSignInForm";

export interface WorkbenchPasswordSignInPageProps extends WorkbenchPasswordSignInFormProps {
  aside?: WorkbenchSecurityPageProps["aside"];
  brand?: WorkbenchSecurityPageProps["brand"];
  panelClassName?: string;
  panelExtra?: WorkbenchSecurityPageProps["panelExtra"];
}

export function WorkbenchPasswordSignInPage({ aside, brand, className, error, panelClassName, panelExtra, ...formProps }: WorkbenchPasswordSignInPageProps) {
  return (
    <WorkbenchSecurityPage aside={aside} brand={brand} className={className} error={error} panelClassName={panelClassName} panelExtra={panelExtra}>
      <WorkbenchPasswordSignInForm {...formProps} />
    </WorkbenchSecurityPage>
  );
}
