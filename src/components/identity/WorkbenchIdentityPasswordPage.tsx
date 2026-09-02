import { LockOutlined, SaveOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import { useState, type ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import { WorkbenchPage } from "../layout/WorkbenchPage";
import { WorkbenchPanel } from "../layout/WorkbenchPanel";
import type {
  WorkbenchIdentityPasswordPolicy,
  WorkbenchIdentityPasswordValues,
} from "./model";

export interface WorkbenchIdentityPasswordPageProps {
  description?: ReactNode;
  error?: ReactNode;
  loading?: boolean;
  passwordPolicy?: WorkbenchIdentityPasswordPolicy;
  title?: ReactNode;
  onSubmit(values: WorkbenchIdentityPasswordValues): Promise<void> | void;
}

interface PasswordFormValues extends WorkbenchIdentityPasswordValues {
  confirmPassword: string;
}

export function WorkbenchIdentityPasswordPage({
  description,
  error,
  loading: externalLoading = false,
  passwordPolicy,
  title,
  onSubmit,
}: WorkbenchIdentityPasswordPageProps) {
  const { messages } = useWorkbenchLocale();
  const [form] = Form.useForm<PasswordFormValues>();
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState<ReactNode>();
  const [success, setSuccess] = useState(false);
  const loading = externalLoading || internalLoading;
  const policy = {
    maxLength: passwordPolicy?.maxLength ?? 128,
    minLength: passwordPolicy?.minLength ?? 8,
    rejectCurrentPassword: passwordPolicy?.rejectCurrentPassword ?? true,
    rejectWhitespaceOnly: passwordPolicy?.rejectWhitespaceOnly ?? true,
  };

  async function submit(values: PasswordFormValues) {
    setInternalError(undefined);
    setSuccess(false);
    setInternalLoading(true);
    try {
      await onSubmit({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      form.resetFields();
      setSuccess(true);
    } catch (nextError) {
      setInternalError(nextError instanceof Error ? nextError.message : String(nextError));
    } finally {
      setInternalLoading(false);
    }
  }

  function validateNewPassword(_: unknown, value?: string) {
    if (!value) {
      return Promise.reject(new Error(messages.identity.password.newRequired));
    }
    if (value.length < policy.minLength) {
      return Promise.reject(new Error(messages.identity.password.minLength(policy.minLength)));
    }
    if (value.length > policy.maxLength) {
      return Promise.reject(new Error(messages.identity.password.maxLength(policy.maxLength)));
    }
    if (policy.rejectWhitespaceOnly && !value.trim()) {
      return Promise.reject(new Error(messages.identity.password.rejectWhitespace));
    }
    if (policy.rejectCurrentPassword && value === form.getFieldValue("currentPassword")) {
      return Promise.reject(new Error(messages.identity.password.rejectCurrent));
    }
    const customError = passwordPolicy?.validate?.(value, form.getFieldValue("currentPassword"));
    return customError
      ? Promise.reject(new Error(customError))
      : Promise.resolve();
  }

  return (
    <WorkbenchPage
      description={description ?? messages.identity.password.description}
      title={title ?? messages.identity.password.title}
    >
      {error || internalError ? (
        <Alert
          showIcon
          title={error ?? internalError}
          type="error"
          style={{ marginBottom: 16 }}
        />
      ) : null}
      {success ? (
        <Alert
          closable
          showIcon
          title={messages.identity.password.saved}
          type="success"
          style={{ marginBottom: 16 }}
        />
      ) : null}
      <WorkbenchPanel>
        <Form<PasswordFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={(values: PasswordFormValues) => void submit(values)}
        >
          <Form.Item
            label={messages.identity.password.current}
            name="currentPassword"
            rules={[{ required: true, message: messages.identity.password.currentRequired }]}
          >
            <Input.Password
              autoComplete="current-password"
              disabled={loading}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item
            label={messages.identity.password.new}
            name="newPassword"
            rules={[{ validator: validateNewPassword }]}
          >
            <Input.Password
              autoComplete="new-password"
              disabled={loading}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item
            dependencies={["newPassword"]}
            label={messages.identity.password.confirm}
            name="confirmPassword"
            rules={[
              { required: true, message: messages.identity.password.confirmRequired },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return !value || getFieldValue("newPassword") === value
                    ? Promise.resolve()
                    : Promise.reject(new Error(messages.identity.password.confirmMismatch));
                },
              }),
            ]}
          >
            <Input.Password
              autoComplete="new-password"
              disabled={loading}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <div>
            <Button
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
              type="primary"
            >
              {messages.identity.password.save}
            </Button>
          </div>
        </Form>
      </WorkbenchPanel>
    </WorkbenchPage>
  );
}
