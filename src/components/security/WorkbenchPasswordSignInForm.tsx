import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Space, Typography } from "antd";
import { useCallback, useState, type ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import { cx } from "../../shared/cx";
import {
  WorkbenchHumanChallengeField,
  type WorkbenchHumanChallengeFieldProps,
} from "./WorkbenchHumanChallengeField";
import type {
  WorkbenchHumanChallengeConfig,
  WorkbenchHumanChallengeResponse,
  WorkbenchImageChallenge,
  WorkbenchPasswordSignInValues,
} from "./model";

interface SignInFormValues {
  password: string;
  username: string;
}

export interface WorkbenchPasswordSignInFormProps {
  actions?: ReactNode;
  challenge?: WorkbenchHumanChallengeConfig;
  className?: string;
  createImageChallenge?: () => Promise<WorkbenchImageChallenge>;
  description?: ReactNode;
  error?: ReactNode;
  loading?: boolean;
  renderRemoteChallenge?: WorkbenchHumanChallengeFieldProps["renderRemoteChallenge"];
  title?: ReactNode;
  onSubmit(values: WorkbenchPasswordSignInValues): Promise<void> | void;
}

export function WorkbenchPasswordSignInForm({
  actions,
  challenge: challengeConfig,
  className,
  createImageChallenge,
  description,
  error,
  loading = false,
  renderRemoteChallenge,
  title,
  onSubmit,
}: WorkbenchPasswordSignInFormProps) {
  const { messages } = useWorkbenchLocale();
  const [challenge, setChallenge] = useState<WorkbenchHumanChallengeResponse>();
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
    <div className={cx("wb-security-form", className)}>
      <Space className="wb-security__header" orientation="vertical" size={4}>
        <Typography.Title level={1}>{title ?? messages.passwordSignIn.title}</Typography.Title>
        <Typography.Text type="secondary">
          {description ?? messages.passwordSignIn.description}
        </Typography.Text>
      </Space>
      {challengeError || error ? (
        <Alert className="wb-security__alert" message={challengeError || error} showIcon type="error" />
      ) : null}
      <Form<SignInFormValues>
        clearOnDestroy
        layout="vertical"
        requiredMark={false}
        onFinish={(values: SignInFormValues) => void submit(values)}
      >
        <Form.Item label={messages.password.username} name="username" rules={[{ required: true, message: messages.password.usernameRequired }]}>
          <Input autoComplete="username" disabled={loading} prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label={messages.password.password} name="password" rules={[{ required: true, message: messages.password.passwordRequired }]}>
          <Input.Password autoComplete="current-password" disabled={loading} prefix={<LockOutlined />} />
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
        <Button block disabled={Boolean(challengeConfig) && !challenge} htmlType="submit" loading={loading} type="primary">
          {messages.passwordSignIn.submit}
        </Button>
      </Form>
      {actions ? <div className="wb-security__actions">{actions}</div> : null}
    </div>
  );
}
