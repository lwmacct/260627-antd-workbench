import { KeyOutlined } from "@ant-design/icons";
import { Alert, Button, Divider, Form, Input, Space, Typography } from "antd";
import type { ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import { cx } from "../../shared/cx";
import { WorkbenchOAuthProviderButtons } from "./WorkbenchOAuthProviderButtons";
import type { WorkbenchOAuthProvider, WorkbenchTokenSignInValues } from "./model";

export interface WorkbenchTokenSignInOAuthOptions {
  pendingProvider?: string;
  providers: WorkbenchOAuthProvider[];
  onSelectProvider(provider: WorkbenchOAuthProvider): void;
}

export interface WorkbenchTokenSignInFormProps {
  actions?: ReactNode;
  className?: string;
  description?: ReactNode;
  error?: ReactNode;
  loading?: boolean;
  oauth?: WorkbenchTokenSignInOAuthOptions;
  retry?: boolean;
  title?: ReactNode;
  onRetry?(): void;
  onSubmit(values: WorkbenchTokenSignInValues): Promise<void> | void;
}

export function WorkbenchTokenSignInForm({
  actions,
  className,
  description,
  error,
  loading = false,
  oauth,
  retry,
  title,
  onRetry,
  onSubmit,
}: WorkbenchTokenSignInFormProps) {
  const { messages } = useWorkbenchLocale();
  const oauthPending = Boolean(oauth?.pendingProvider);
  return (
    <div className={cx("wb-security-form", className)}>
      <Space className="wb-security__header" orientation="vertical" size={4}>
        <Typography.Title level={1}>{title ?? messages.tokenSignIn.title}</Typography.Title>
        <Typography.Text type="secondary">
          {description ?? messages.tokenSignIn.description}
        </Typography.Text>
      </Space>
      {error ? <Alert className="wb-security__alert" message={error} showIcon type="error" /> : null}
      <Form<WorkbenchTokenSignInValues>
        clearOnDestroy
        layout="vertical"
        requiredMark={false}
        onFinish={(values: WorkbenchTokenSignInValues) => void onSubmit(values)}
      >
        <Form.Item
          label={messages.tokenSignIn.token}
          name="token"
          rules={[{ required: true, message: messages.tokenSignIn.tokenRequired }]}
        >
          <Input.Password autoComplete="current-password" disabled={loading || oauthPending} prefix={<KeyOutlined />} />
        </Form.Item>
        <Button block disabled={oauthPending} htmlType="submit" loading={loading} type="primary">
          {messages.tokenSignIn.submit}
        </Button>
        {retry && onRetry ? (
          <Button block type="text" onClick={onRetry}>
            {messages.auth.retry}
          </Button>
        ) : null}
      </Form>
      {oauth && oauth.providers.length > 0 ? (
        <div className="wb-token-sign-in__oauth">
          <Divider plain>{messages.auth.alternative}</Divider>
          <WorkbenchOAuthProviderButtons
            disabled={loading}
            loadingProvider={oauth.pendingProvider}
            loadingText={messages.auth.signingIn}
            providers={oauth.providers}
            onSelect={oauth.onSelectProvider}
          />
        </div>
      ) : null}
      {actions ? <div className="wb-security__actions">{actions}</div> : null}
    </div>
  );
}
