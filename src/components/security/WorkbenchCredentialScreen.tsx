import {
  GithubOutlined,
  GoogleOutlined,
  LockOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Alert, Button, Card, Divider, Form, Input, Space, Typography } from "antd";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { cx } from "../../shared/cx";
import { WorkbenchChallengeField, type WorkbenchRemoteChallengeRenderProps } from "./WorkbenchChallengeField";
import { defaultWorkbenchCredentialLabels, type WorkbenchCredentialLabels } from "./labels";
import {
  defaultWorkbenchCredentialConfig,
  type WorkbenchCredentialChallengeResponse,
  type WorkbenchCredentialMode,
  type WorkbenchCredentialConfig,
  type WorkbenchCredentialSubmitValues,
  type WorkbenchImageChallenge,
  type WorkbenchOAuthProvider,
} from "./model";

interface CredentialFormValues {
  confirmPassword?: string;
  password: string;
  username: string;
}

export interface WorkbenchCredentialModeSwitchRenderProps {
  children: ReactNode;
  targetMode: WorkbenchCredentialMode;
}

export interface WorkbenchCredentialScreenProps {
  className?: string;
  config?: WorkbenchCredentialConfig;
  createImageChallenge(): Promise<WorkbenchImageChallenge>;
  error?: ReactNode;
  labels?: WorkbenchCredentialLabels;
  loading?: boolean;
  mode: WorkbenchCredentialMode;
  oauthIcons?: Record<string, ReactNode>;
  panelClassName?: string;
  panelExtra?: ReactNode;
  renderModeSwitch?(props: WorkbenchCredentialModeSwitchRenderProps): ReactNode;
  renderRemoteChallenge?(props: WorkbenchRemoteChallengeRenderProps): ReactNode;
  onModeChange?(mode: WorkbenchCredentialMode): void;
  onOAuthLogin?(provider: WorkbenchOAuthProvider): void;
  onSubmit(values: WorkbenchCredentialSubmitValues): Promise<void> | void;
}

export function WorkbenchCredentialScreen({
  className,
  config = defaultWorkbenchCredentialConfig,
  createImageChallenge,
  error,
  labels,
  loading = false,
  mode,
  oauthIcons,
  panelClassName,
  panelExtra,
  renderModeSwitch,
  renderRemoteChallenge,
  onModeChange,
  onOAuthLogin,
  onSubmit,
}: WorkbenchCredentialScreenProps) {
  const [form] = Form.useForm<CredentialFormValues>();
  const [challenge, setChallenge] = useState<WorkbenchCredentialChallengeResponse>();
  const [challengeError, setChallengeError] = useState("");
  const [challengeResetKey, setChallengeResetKey] = useState(0);
  const mergedLabels = { ...defaultWorkbenchCredentialLabels, ...labels };
  const isRegister = mode === "register";
  const localLoginEnabled = config.local.loginEnabled;
  const registrationEnabled = config.local.registrationEnabled;
  const oauthProviders = config.oauth.enabled ? config.oauth.providers : [];
  const visibleError = challengeError || error;

  const resetChallenge = useCallback(() => {
    setChallenge(undefined);
    setChallengeError("");
    setChallengeResetKey((value) => value + 1);
  }, []);

  useEffect(() => {
    form.resetFields();
    resetChallenge();
  }, [form, mode, resetChallenge]);

  async function submit(values: CredentialFormValues) {
    if (!challenge || loading) {
      return;
    }

    if (isRegister && values.password !== values.confirmPassword) {
      form.setFields([
        { errors: [mergedLabels.confirmPasswordMismatch], name: "confirmPassword" },
      ]);
      return;
    }

    try {
      await onSubmit({
        challenge,
        mode,
        password: values.password,
        username: values.username,
      });
      form.setFieldValue("password", "");
      form.setFieldValue("confirmPassword", "");
    } catch {
      resetChallenge();
    }
  }

  function validatePassword(_: unknown, value?: string) {
    if (!value) {
      return Promise.reject(new Error(mergedLabels.passwordRequired));
    }

    if (value.length < 8) {
      return Promise.reject(new Error(mergedLabels.passwordMinLength));
    }

    const username = form.getFieldValue("username")?.trim().toLowerCase();
    if (username && username.length >= 3 && value.toLowerCase().includes(username)) {
      return Promise.reject(new Error(mergedLabels.passwordContainsUsername));
    }

    return Promise.resolve();
  }

  return (
    <main className={cx("wb-security", className)}>
      <Card className={cx("wb-security__panel", panelClassName)}>
        {panelExtra ? <div className="wb-security__panel-extra">{panelExtra}</div> : null}

        <Space orientation="vertical" size={4} className="wb-security__header">
          <Typography.Title level={1}>
            {isRegister ? mergedLabels.registerTitle : mergedLabels.loginTitle}
          </Typography.Title>
          <Typography.Text type="secondary">
            {isRegister ? mergedLabels.registerDescription : mergedLabels.loginDescription}
          </Typography.Text>
        </Space>

        {visibleError ? (
          <Alert className="wb-security__alert" showIcon title={visibleError} type="error" />
        ) : null}

        {oauthProviders.length > 0 ? (
          <Space orientation="vertical" className="wb-security__oauth-buttons">
            {oauthProviders.map((provider) => (
              <Button
                key={provider.provider}
                block
                icon={oauthIcons?.[provider.provider] ?? defaultOAuthIcon(provider.provider)}
                onClick={() => onOAuthLogin?.(provider)}
              >
                {mergedLabels.oauthLogin(provider.label)}
              </Button>
            ))}
          </Space>
        ) : null}

        {oauthProviders.length > 0 && localLoginEnabled ? <Divider plain>或</Divider> : null}

        <Form<CredentialFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={(values) => void submit(values)}
          disabled={!localLoginEnabled}
        >
          <Form.Item
            label={mergedLabels.username}
            name="username"
            rules={[{ required: true, message: mergedLabels.usernameRequired }]}
          >
            <Input autoComplete="username" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            label={mergedLabels.password}
            name="password"
            rules={[{ validator: validatePassword }]}
          >
            <Input.Password
              autoComplete={isRegister ? "new-password" : "current-password"}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          {isRegister ? (
            <Form.Item
              label={mergedLabels.confirmPassword}
              name="confirmPassword"
              rules={[{ required: true, message: mergedLabels.confirmPasswordRequired }]}
            >
              <Input.Password
                autoComplete="new-password"
                aria-label={String(mergedLabels.confirmPassword)}
                prefix={<LockOutlined />}
              />
            </Form.Item>
          ) : null}
          <Form.Item label={mergedLabels.captcha} required>
            <WorkbenchChallengeField
              config={config.challenge}
              createImageChallenge={createImageChallenge}
              disabled={loading}
              labels={mergedLabels}
              onChange={setChallenge}
              onError={setChallengeError}
              renderRemoteChallenge={renderRemoteChallenge}
              resetKey={challengeResetKey}
            />
          </Form.Item>
          <Button
            block
            disabled={!challenge || (isRegister && !registrationEnabled)}
            htmlType="submit"
            loading={loading}
            type="primary"
          >
            {isRegister ? mergedLabels.registerSubmit : mergedLabels.loginSubmit}
          </Button>
        </Form>

        {renderStatusOrModeSwitch({
          isRegister,
          localLoginEnabled,
          registrationEnabled,
          labels: mergedLabels,
          onModeChange,
          renderModeSwitch,
        })}
      </Card>
    </main>
  );
}

function renderStatusOrModeSwitch({
  isRegister,
  labels,
  localLoginEnabled,
  registrationEnabled,
  renderModeSwitch,
  onModeChange,
}: {
  isRegister: boolean;
  labels: Required<WorkbenchCredentialLabels>;
  localLoginEnabled: boolean;
  registrationEnabled: boolean;
  renderModeSwitch?: (props: WorkbenchCredentialModeSwitchRenderProps) => ReactNode;
  onModeChange?: (mode: WorkbenchCredentialMode) => void;
}) {
  if (!localLoginEnabled) {
    return (
      <Typography.Paragraph className="wb-security__mode-switch" type="secondary">
        {labels.disabledLocalLogin}
      </Typography.Paragraph>
    );
  }

  if (!registrationEnabled) {
    return (
      <Typography.Paragraph className="wb-security__mode-switch" type="secondary">
        {labels.disabledRegistration}
      </Typography.Paragraph>
    );
  }

  const targetMode: WorkbenchCredentialMode = isRegister ? "login" : "register";
  const prefix = isRegister ? labels.modeSwitchLoginPrefix : labels.modeSwitchRegisterPrefix;
  const children = isRegister ? labels.modeSwitchLogin : labels.modeSwitchRegister;
  const switchControl = renderModeSwitch ? (
    renderModeSwitch({ children, targetMode })
  ) : (
    <Button type="link" onClick={() => onModeChange?.(targetMode)}>
      {children}
    </Button>
  );

  return (
    <Typography.Paragraph className="wb-security__mode-switch">
      {prefix}
      {switchControl}
    </Typography.Paragraph>
  );
}

function defaultOAuthIcon(provider: string): ReactNode {
  if (provider === "github") {
    return <GithubOutlined />;
  }
  if (provider === "google") {
    return <GoogleOutlined />;
  }
  return <LoginOutlined />;
}
