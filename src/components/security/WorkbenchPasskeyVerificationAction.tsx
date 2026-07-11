import { KeyOutlined } from "@ant-design/icons";
import { Alert, Button, Space, Typography } from "antd";
import type { ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import { cx } from "../../shared/cx";
import type { WorkbenchPasskeyVerificationValues, WorkbenchVerificationPurpose } from "./model";

export interface WorkbenchPasskeyVerificationActionProps {
  className?: string;
  description?: ReactNode;
  error?: ReactNode;
  loading?: boolean;
  purpose: WorkbenchVerificationPurpose;
  subject?: ReactNode;
  title?: ReactNode;
  onSubmit(values: WorkbenchPasskeyVerificationValues): Promise<void> | void;
}

export function WorkbenchPasskeyVerificationAction({ className, description, error, loading, purpose, subject, title, onSubmit }: WorkbenchPasskeyVerificationActionProps) {
  const { messages } = useWorkbenchLocale();
  return <div className={cx("wb-security-form", className)}>
    <Space className="wb-security__header" orientation="vertical" size={4}>
      <Typography.Title level={1}>{title ?? messages.passkeyVerification.title}</Typography.Title>
      <Typography.Text type="secondary">{description ?? messages.passkeyVerification.description}</Typography.Text>
      {subject ? <Typography.Text>{subject}</Typography.Text> : null}
    </Space>
    {error ? <Alert className="wb-security__alert" message={error} showIcon type="error" /> : null}
    <Button block icon={<KeyOutlined />} loading={loading} size="large" type="primary" onClick={() => void onSubmit({ kind: "passkey", purpose })}>{messages.passkeyVerification.submit}</Button>
  </div>;
}
