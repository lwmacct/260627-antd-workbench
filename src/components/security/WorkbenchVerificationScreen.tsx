import { LockOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import type { ReactNode } from "react";
import { cx } from "../../shared/cx";
import {
  defaultWorkbenchVerificationLabels,
  type WorkbenchVerificationLabels,
} from "./labels";
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

export interface WorkbenchVerificationScreenProps {
  className?: string;
  description?: ReactNode;
  error?: ReactNode;
  labels?: WorkbenchVerificationLabels;
  loading?: boolean;
  method?: WorkbenchVerificationMethod;
  panelClassName?: string;
  panelExtra?: ReactNode;
  purpose: WorkbenchVerificationPurpose;
  rememberOption?: false | WorkbenchVerificationRememberOption;
  title?: ReactNode;
  onBack?(): void;
  onSubmit(values: WorkbenchVerificationSubmitValues): Promise<void> | void;
}

export function WorkbenchVerificationScreen({
  className,
  description,
  error,
  labels,
  loading = false,
  method = "totp",
  panelClassName,
  panelExtra,
  purpose,
  rememberOption,
  title,
  onBack,
  onSubmit,
}: WorkbenchVerificationScreenProps) {
  const mergedLabels = { ...defaultWorkbenchVerificationLabels, ...labels };
  const resolvedRememberOption = rememberOption === false ? undefined : rememberOption;
  const rememberEnabled = resolvedRememberOption?.enabled !== false;
  const rememberMinutes = resolvedRememberOption?.minutes ?? 0;

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

        <Space className="wb-security__header" orientation="vertical" size={4}>
          <Typography.Title level={1}>{title ?? mergedLabels.title}</Typography.Title>
          <Typography.Text type="secondary">
            {description ?? mergedLabels.description}
          </Typography.Text>
        </Space>

        {error ? <Alert className="wb-security__alert" showIcon title={error} type="error" /> : null}

        <Form<VerificationFormValues>
          initialValues={{ remember: resolvedRememberOption?.defaultChecked ?? false }}
          layout="vertical"
          requiredMark={false}
          onFinish={(values) => void submit(values)}
        >
          <Form.Item
            label={mergedLabels.code}
            name="code"
            rules={[{ required: true, message: mergedLabels.codeRequired }]}
          >
            <Input
              autoComplete="one-time-code"
              inputMode="numeric"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          {rememberEnabled && rememberMinutes > 0 ? (
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>
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
      </Card>
    </main>
  );
}
