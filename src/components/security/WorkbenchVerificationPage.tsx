import { Button, Card } from "antd";
import type { ReactNode } from "react";
import { cx } from "../../shared/cx";
import {
  defaultWorkbenchVerificationLabels,
  type WorkbenchVerificationLabels,
} from "./labels";
import {
  WorkbenchVerificationForm,
  type WorkbenchVerificationFormProps,
} from "./WorkbenchVerificationForm";

export interface WorkbenchVerificationPageProps extends WorkbenchVerificationFormProps {
  panelClassName?: string;
  panelExtra?: ReactNode;
  onBack?(): void;
}

export function WorkbenchVerificationPage({
  className,
  labels,
  panelClassName,
  panelExtra,
  onBack,
  ...formProps
}: WorkbenchVerificationPageProps) {
  const mergedLabels: Required<WorkbenchVerificationLabels> = {
    ...defaultWorkbenchVerificationLabels,
    ...labels,
  };

  return (
    <main className={cx("wb-security", className)}>
      <Card className={cx("wb-security__panel", panelClassName)}>
        {panelExtra || onBack ? (
          <div className="wb-security__panel-extra">
            {panelExtra ?? (
              <Button type="text" onClick={onBack}>
                {mergedLabels.back}
              </Button>
            )}
          </div>
        ) : null}

        <WorkbenchVerificationForm labels={labels} {...formProps} />
      </Card>
    </main>
  );
}
