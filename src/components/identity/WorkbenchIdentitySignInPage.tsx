import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Space, Typography } from "antd";
import { useCallback, useState, type ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import {
  WorkbenchHumanChallengeField,
  type WorkbenchHumanChallengeFieldProps,
} from "../security/WorkbenchHumanChallengeField";
import type { WorkbenchSecurityPageProps } from "../security/WorkbenchSecurityPage";
import { WorkbenchSecurityPage } from "../security/WorkbenchSecurityPage";
import type {
  WorkbenchHumanChallengeConfig,
  WorkbenchIdentitySignInValues,
  WorkbenchImageChallenge,
} from "./model";

interface SignInFormValues {
  identifier: string;
  password: string;
}

export interface WorkbenchIdentitySignInPageProps {
  actions?: ReactNode;
  aside?: WorkbenchSecurityPageProps["aside"];
  brand?: WorkbenchSecurityPageProps["brand"];
  challenge?: WorkbenchHumanChallengeConfig;
  className?: string;
  createImageChallenge?: () => Promise<WorkbenchImageChallenge>;
  description?: ReactNode;
  error?: ReactNode;
  loading?: boolean;
  panelClassName?: string;
  panelExtra?: WorkbenchSecurityPageProps["panelExtra"];
  renderRemoteChallenge?: WorkbenchHumanChallengeFieldProps["renderRemoteChallenge"];
  title?: ReactNode;
  onSubmit(values: WorkbenchIdentitySignInValues): Promise<void> | void;
}

export function WorkbenchIdentitySignInPage({
  actions,
  aside,
  brand,
  challenge: challengeConfig,
  className,
  createImageChallenge,
  description,
  error,
  loading = false,
  panelClassName,
  panelExtra,
  renderRemoteChallenge,
  title,
  onSubmit,
}: WorkbenchIdentitySignInPageProps) {
  const { messages } = useWorkbenchLocale();
  const [challenge, setChallenge] = useState<WorkbenchIdentitySignInValues["challenge"]>();
  const [challengeError, setChallengeError] = useState<ReactNode>();
  const [challengeResetKey, setChallengeResetKey] = useState(0);
  const resetChallenge = useCallback(() => {
    setChallenge(undefined);
    setChallengeError(undefined);
    setChallengeResetKey((value) => value + 1);
  }, []);

  async function submit(values: SignInFormValues) {
    if (challengeConfig && !challenge) return;
    try {
      await onSubmit({ ...values, challenge });
    } catch {
      resetChallenge();
    }
  }

  return (
    <WorkbenchSecurityPage
      aside={aside}
      brand={brand}
      className={className}
      error={error}
      panelClassName={panelClassName}
      panelExtra={panelExtra}
    >
      <div className="wb-security-form">
        <Space className="wb-security__header" orientation="vertical" size={4}>
          <Typography.Title level={1}>{title ?? messages.identity.signIn.title}</Typography.Title>
          <Typography.Text type="secondary">
            {description ?? messages.identity.signIn.description}
          </Typography.Text>
        </Space>
        {challengeError ? (
          <Alert className="wb-security__alert" message={challengeError} showIcon type="error" />
        ) : null}
        <Form<SignInFormValues>
          clearOnDestroy
          layout="vertical"
          requiredMark={false}
          onFinish={(values: SignInFormValues) => void submit(values)}
        >
          <Form.Item
            label={messages.identity.signIn.identifier}
            name="identifier"
            rules={[{ required: true, message: messages.identity.signIn.identifierRequired }]}
          >
            <Input autoComplete="username" disabled={loading} prefix={<UserOutlined />} size="large" />
          </Form.Item>
          <Form.Item
            label={messages.password.password}
            name="password"
            rules={[{ required: true, message: messages.password.passwordRequired }]}
          >
            <Input.Password
              autoComplete="current-password"
              disabled={loading}
              prefix={<LockOutlined />}
              size="large"
            />
          </Form.Item>
          {challengeConfig ? (
            <Form.Item label={messages.humanChallenge.label} required>
              <WorkbenchHumanChallengeField
                config={challengeConfig}
                createImageChallenge={createImageChallenge}
                disabled={loading}
                renderRemoteChallenge={renderRemoteChallenge}
                resetKey={challengeResetKey}
                onChange={setChallenge}
                onError={setChallengeError}
              />
            </Form.Item>
          ) : null}
          <Button
            block
            disabled={Boolean(challengeConfig) && !challenge}
            htmlType="submit"
            loading={loading}
            size="large"
            type="primary"
          >
            {messages.identity.signIn.submit}
          </Button>
        </Form>
        {actions ? <div className="wb-security__actions">{actions}</div> : null}
      </div>
    </WorkbenchSecurityPage>
  );
}
