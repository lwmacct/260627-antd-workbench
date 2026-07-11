import { Button } from "antd";
import Card from "antd/es/card/Card";
import type { ReactNode } from "react";
import { cx } from "../../shared/cx";
import { useWorkbenchLocale } from "../../locale/context";
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
  panelClassName,
  panelExtra,
  onBack,
  ...formProps
}: WorkbenchVerificationPageProps) {
  const { messages } = useWorkbenchLocale();

  return (
    <main className={cx("wb-security", className)}>
      <Card className={cx("wb-security__panel", panelClassName)}>
        {panelExtra || onBack ? (
          <div className="wb-security__panel-extra">
            {panelExtra ?? (
              <Button type="text" onClick={onBack}>
                {messages.verification.back}
              </Button>
            )}
          </div>
        ) : null}

        <WorkbenchVerificationForm {...formProps} />
      </Card>
    </main>
  );
}
