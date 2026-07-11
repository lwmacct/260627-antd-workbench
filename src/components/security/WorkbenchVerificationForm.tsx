import { LockOutlined } from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, Space, Typography } from "antd";
import { useEffect, type ReactNode } from "react";
import { cx } from "../../shared/cx";
import { useWorkbenchLocale } from "../../locale/context";
import type {
  WorkbenchVerificationMethod,
  WorkbenchVerificationPurpose,
  WorkbenchVerificationRememberOption,
  WorkbenchVerificationSubmitValues,
} from "./model";

interface VerificationFormValues {
  code?: string;
  remember?: boolean;
}

export interface WorkbenchVerificationFormProps {
  className?: string;
  description?: ReactNode;
  error?: ReactNode;
  loading?: boolean;
  method?: WorkbenchVerificationMethod;
  purpose: WorkbenchVerificationPurpose;
  rememberOption?: false | WorkbenchVerificationRememberOption;
  title?: ReactNode;
  onSubmit(values: WorkbenchVerificationSubmitValues): Promise<void> | void;
}

export function WorkbenchVerificationForm({
  className,
  description,
  error,
  loading = false,
  method = "totp",
  purpose,
  rememberOption,
  title,
  onSubmit,
}: WorkbenchVerificationFormProps) {
  const { messages } = useWorkbenchLocale();
  const [form] = Form.useForm<VerificationFormValues>();
  const mergedLabels = messages.verification;
  const resolvedRememberOption = rememberOption === false ? undefined : rememberOption;
  const rememberEnabled = resolvedRememberOption?.enabled !== false;
  const rememberMinutes = resolvedRememberOption?.minutes ?? 0;
  const defaultRemember = resolvedRememberOption?.defaultChecked ?? false;

  useEffect(() => {
    form.resetFields();
  }, [defaultRemember, form, method, purpose, rememberMinutes]);

  function submit(values: VerificationFormValues) {
    const code = values.code?.trim();
    if (!code) {
      return;
    }

    return onSubmit({
      code,
      method,
      purpose,
      remember: rememberEnabled ? values.remember : undefined,
      rememberForMinutes: rememberEnabled ? rememberMinutes : undefined,
    });
  }

  return (
    <div className={cx("wb-security-form", className)}>
      <Space className="wb-security__header" orientation="vertical" size={4}>
        <Typography.Title level={1}>{title ?? mergedLabels.title}</Typography.Title>
        <Typography.Text type="secondary">
          {description ?? mergedLabels.description}
        </Typography.Text>
      </Space>

      {error ? <Alert className="wb-security__alert" showIcon title={error} type="error" /> : null}

      <Form<VerificationFormValues>
        clearOnDestroy
        form={form}
        initialValues={{ remember: defaultRemember }}
        layout="vertical"
        requiredMark={false}
        onFinish={(values: VerificationFormValues) => void submit(values)}
      >
        <Form.Item
          label={mergedLabels.code}
          name="code"
          rules={[{ required: true, message: mergedLabels.codeRequired }]}
        >
          <Input
            autoComplete="one-time-code"
            disabled={loading}
            inputMode="numeric"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        {rememberEnabled && rememberMinutes > 0 ? (
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox disabled={loading}>
              {typeof mergedLabels.remember === "function"
                ? mergedLabels.remember(rememberMinutes)
                : mergedLabels.remember}
            </Checkbox>
          </Form.Item>
        ) : null}

        <Button block htmlType="submit" loading={loading} type="primary">
          {mergedLabels.submit}
        </Button>
      </Form>
    </div>
  );
}
