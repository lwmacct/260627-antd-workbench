import { Card } from "antd";
import type { ReactNode } from "react";
import { cx } from "../../shared/cx";
import {
  WorkbenchCredentialForm,
  type WorkbenchCredentialFormProps,
} from "./WorkbenchCredentialForm";

export interface WorkbenchCredentialPageProps extends WorkbenchCredentialFormProps {
  panelClassName?: string;
  panelExtra?: ReactNode;
}

export function WorkbenchCredentialPage({
  className,
  panelClassName,
  panelExtra,
  ...formProps
}: WorkbenchCredentialPageProps) {
  return (
    <main className={cx("wb-security", className)}>
      <Card className={cx("wb-security__panel", panelClassName)}>
        {panelExtra ? <div className="wb-security__panel-extra">{panelExtra}</div> : null}
        <WorkbenchCredentialForm {...formProps} />
      </Card>
    </main>
  );
}
