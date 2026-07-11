import { LockOutlined } from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, Space, Typography } from "antd";
import { useEffect, type ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import { cx } from "../../shared/cx";
import type { WorkbenchCodeVerificationMethod, WorkbenchCodeVerificationValues, WorkbenchVerificationPurpose, WorkbenchVerificationRememberOption } from "./model";

interface CodeFormValues { code?: string; remember?: boolean }

export interface WorkbenchCodeVerificationFormProps {
  className?: string;
  description?: ReactNode;
  error?: ReactNode;
  inputMode?: "numeric" | "text";
  loading?: boolean;
  method: WorkbenchCodeVerificationMethod;
  purpose: WorkbenchVerificationPurpose;
  rememberOption?: false | WorkbenchVerificationRememberOption;
  subject?: ReactNode;
  title?: ReactNode;
  onSubmit(values: WorkbenchCodeVerificationValues): Promise<void> | void;
}

export function WorkbenchCodeVerificationForm({ className, description, error, inputMode = "numeric", loading = false, method, purpose, rememberOption, subject, title, onSubmit }: WorkbenchCodeVerificationFormProps) {
  const { messages } = useWorkbenchLocale();
  const [form] = Form.useForm<CodeFormValues>();
  const rememberEnabled = rememberOption !== false && rememberOption?.enabled !== false && Boolean(rememberOption?.minutes);
  const rememberMinutes = rememberOption ? rememberOption.minutes : 0;
  const defaultRemember = rememberOption ? rememberOption.defaultChecked ?? false : false;
  useEffect(() => { form.resetFields(); }, [defaultRemember, form, method, purpose, rememberMinutes]);

  function submit(values: CodeFormValues) {
    const code = values.code?.trim();
    if (!code) return;
    return onSubmit({ code, kind: "code", method, purpose, remember: rememberEnabled ? values.remember : undefined, rememberForMinutes: rememberEnabled ? rememberMinutes : undefined });
  }

  return <div className={cx("wb-security-form", className)}>
    <Space className="wb-security__header" orientation="vertical" size={4}>
      <Typography.Title level={1}>{title ?? messages.codeVerification.title}</Typography.Title>
      <Typography.Text type="secondary">{description ?? messages.codeVerification.description}</Typography.Text>
      {subject ? <Typography.Text>{subject}</Typography.Text> : null}
    </Space>
    {error ? <Alert className="wb-security__alert" message={error} showIcon type="error" /> : null}
    <Form<CodeFormValues> clearOnDestroy form={form} initialValues={{ remember: defaultRemember }} layout="vertical" requiredMark={false} onFinish={(values: CodeFormValues) => void submit(values)}>
      <Form.Item label={messages.codeVerification.code} name="code" rules={[{ required: true, message: messages.codeVerification.codeRequired }]}>
        <Input autoComplete="one-time-code" disabled={loading} inputMode={inputMode} prefix={<LockOutlined />} />
      </Form.Item>
      {rememberEnabled ? <Form.Item name="remember" valuePropName="checked"><Checkbox disabled={loading}>{messages.codeVerification.remember(rememberMinutes)}</Checkbox></Form.Item> : null}
      <Button block htmlType="submit" loading={loading} type="primary">{messages.codeVerification.submit}</Button>
    </Form>
  </div>;
}
