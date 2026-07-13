import type { WorkbenchSecurityPageProps } from "./WorkbenchSecurityPage";
import { WorkbenchSecurityPage } from "./WorkbenchSecurityPage";
import {
  WorkbenchTokenSignInForm,
  type WorkbenchTokenSignInFormProps,
} from "./WorkbenchTokenSignInForm";

export interface WorkbenchTokenSignInPageProps extends WorkbenchTokenSignInFormProps {
  brand?: WorkbenchSecurityPageProps["brand"];
  panelClassName?: string;
  panelExtra?: WorkbenchSecurityPageProps["panelExtra"];
}

export function WorkbenchTokenSignInPage({
  brand,
  className,
  error,
  panelClassName,
  panelExtra,
  ...formProps
}: WorkbenchTokenSignInPageProps) {
  return (
    <WorkbenchSecurityPage
      brand={brand}
      className={className}
      error={error}
      panelClassName={panelClassName}
      panelExtra={panelExtra}
    >
      <WorkbenchTokenSignInForm {...formProps} />
    </WorkbenchSecurityPage>
  );
}
