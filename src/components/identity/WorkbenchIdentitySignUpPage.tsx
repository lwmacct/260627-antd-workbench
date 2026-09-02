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
  WorkbenchIdentitySignUpValues,
  WorkbenchImageChallenge,
} from "./model";

interface SignUpFormValues {
  confirmPassword: string;
  password: string;
  username: string;
}

export interface WorkbenchIdentitySignUpPageProps {
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
  terms?: ReactNode;
  title?: ReactNode;
  onSubmit(values: WorkbenchIdentitySignUpValues): Promise<void> | void;
}

export function WorkbenchIdentitySignUpPage({
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
  terms,
  title,
  onSubmit,
}: WorkbenchIdentitySignUpPageProps) {
  const { messages } = useWorkbenchLocale();
  const [form] = Form.useForm<SignUpFormValues>();
  const [challenge, setChallenge] = useState<WorkbenchIdentitySignUpValues["challenge"]>();
  const [challengeError, setChallengeError] = useState<ReactNode>();
  const [challengeResetKey, setChallengeResetKey] = useState(0);
  const resetChallenge = useCallback(() => {
    setChallenge(undefined);
    setChallengeError(undefined);
    setChallengeResetKey((value) => value + 1);
  }, []);

  async function submit(values: SignUpFormValues) {
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
          <Typography.Title level={1}>{title ?? messages.identity.signUp.title}</Typography.Title>
          <Typography.Text type="secondary">
            {description ?? messages.identity.signUp.description}
          </Typography.Text>
        </Space>
        {challengeError ? (
          <Alert className="wb-security__alert" message={challengeError} showIcon type="error" />
        ) : null}
        <Form<SignUpFormValues>
          clearOnDestroy
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={(values: SignUpFormValues) => void submit(values)}
        >
          <Form.Item
            label={messages.password.username}
            name="username"
            rules={[{ required: true, message: messages.password.usernameRequired }]}
          >
            <Input autoComplete="username" disabled={loading} prefix={<UserOutlined />} size="large" />
          </Form.Item>
          <Form.Item
            label={messages.password.password}
            name="password"
            rules={[
              { required: true, message: messages.password.passwordRequired },
              { min: 8, message: messages.password.passwordMinLength },
            ]}
          >
            <Input.Password
              autoComplete="new-password"
              disabled={loading}
              prefix={<LockOutlined />}
              size="large"
            />
          </Form.Item>
          <Form.Item
            dependencies={["password"]}
            label={messages.password.confirmPassword}
            name="confirmPassword"
            rules={[
              { required: true, message: messages.password.confirmPasswordRequired },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return !value || getFieldValue("password") === value
                    ? Promise.resolve()
                    : Promise.reject(new Error(messages.password.confirmPasswordMismatch));
                },
              }),
            ]}
          >
            <Input.Password
              autoComplete="new-password"
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
          {terms ? <div className="wb-security__terms">{terms}</div> : null}
          <Button
            block
            disabled={Boolean(challengeConfig) && !challenge}
            htmlType="submit"
            loading={loading}
            size="large"
            type="primary"
          >
            {messages.identity.signUp.submit}
          </Button>
        </Form>
        {actions ? <div className="wb-security__actions">{actions}</div> : null}
      </div>
    </WorkbenchSecurityPage>
  );
}
