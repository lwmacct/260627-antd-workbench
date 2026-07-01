import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Divider, Form, Input, Space, Typography } from "antd";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { cx } from "../../shared/cx";
import { WorkbenchChallengeField, type WorkbenchRemoteChallengeRenderProps } from "./WorkbenchChallengeField";
import { WorkbenchOAuthButtons } from "./WorkbenchOAuthButtons";
import { defaultWorkbenchCredentialLabels, type WorkbenchCredentialLabels } from "./labels";
import {
  defaultWorkbenchCredentialConfig,
  type WorkbenchChallengeResponse,
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

export interface WorkbenchCredentialFormProps {
  className?: string;
  config?: WorkbenchCredentialConfig;
  createImageChallenge?: () => Promise<WorkbenchImageChallenge>;
  error?: ReactNode;
  labels?: WorkbenchCredentialLabels;
  loading?: boolean;
  mode: WorkbenchCredentialMode;
  oauthLoadingProvider?: string;
  renderModeSwitch?(props: WorkbenchCredentialModeSwitchRenderProps): ReactNode;
  renderRemoteChallenge?(props: WorkbenchRemoteChallengeRenderProps): ReactNode;
  onModeChange?(mode: WorkbenchCredentialMode): void;
  onOAuthLogin?(provider: WorkbenchOAuthProvider): void;
  onSubmit(values: WorkbenchCredentialSubmitValues): Promise<void> | void;
}

export function WorkbenchCredentialForm({
  className,
  config = defaultWorkbenchCredentialConfig,
  createImageChallenge,
  error,
  labels,
  loading = false,
  mode,
  oauthLoadingProvider,
  renderModeSwitch,
  renderRemoteChallenge,
  onModeChange,
  onOAuthLogin,
  onSubmit,
}: WorkbenchCredentialFormProps) {
  const [form] = Form.useForm<CredentialFormValues>();
  const [challenge, setChallenge] = useState<WorkbenchChallengeResponse>();
  const [challengeError, setChallengeError] = useState("");
  const [challengeResetKey, setChallengeResetKey] = useState(0);
  const mergedLabels = {
    ...defaultWorkbenchCredentialLabels,
    ...labels,
    challenge: {
      ...defaultWorkbenchCredentialLabels.challenge,
      ...labels?.challenge,
    },
    oauth: {
      ...defaultWorkbenchCredentialLabels.oauth,
      ...labels?.oauth,
    },
  };
  const localConfig = config.local === undefined ? defaultWorkbenchCredentialConfig.local : config.local;
  const oauthConfig = config.oauth === undefined ? defaultWorkbenchCredentialConfig.oauth : config.oauth;
  const challengeConfig =
    config.challenge === undefined ? defaultWorkbenchCredentialConfig.challenge : config.challenge;
  const isRegister = mode === "register";
  const localEnabled = localConfig !== false;
  const localLoginEnabled = localConfig !== false && localConfig.loginEnabled !== false;
  const registrationEnabled = localConfig !== false && localConfig.registrationEnabled !== false;
  const oauthProviders = oauthConfig === false ? [] : oauthConfig.providers;
  const resolvedChallengeConfig = challengeConfig === false ? undefined : challengeConfig;
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
    if (loading || (resolvedChallengeConfig && !challenge)) {
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
    if (isRegister && username && username.length >= 3 && value.toLowerCase().includes(username)) {
      return Promise.reject(new Error(mergedLabels.passwordContainsUsername));
    }

    return Promise.resolve();
  }

  return (
    <div className={cx("wb-security-form", className)}>
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

      <WorkbenchOAuthButtons
        disabled={loading}
        labels={mergedLabels.oauth}
        loadingProvider={oauthLoadingProvider}
        providers={oauthProviders}
        onSelect={(provider) => onOAuthLogin?.(provider)}
      />

      {oauthProviders.length > 0 && localLoginEnabled ? <Divider plain>或</Divider> : null}

      {localEnabled ? (
        <Form<CredentialFormValues>
          clearOnDestroy
          disabled={!localLoginEnabled}
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={(values) => void submit(values)}
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
          {resolvedChallengeConfig ? (
            <Form.Item label={mergedLabels.challenge.captcha} required>
              <WorkbenchChallengeField
                config={resolvedChallengeConfig}
                createImageChallenge={createImageChallenge}
                disabled={loading}
                labels={mergedLabels.challenge}
                onChange={setChallenge}
                onError={setChallengeError}
                renderRemoteChallenge={renderRemoteChallenge}
                resetKey={challengeResetKey}
              />
            </Form.Item>
          ) : null}
          <Button
            block
            disabled={(Boolean(resolvedChallengeConfig) && !challenge) || (isRegister && !registrationEnabled)}
            htmlType="submit"
            loading={loading}
            type="primary"
          >
            {isRegister ? mergedLabels.registerSubmit : mergedLabels.loginSubmit}
          </Button>
        </Form>
      ) : null}

      {localEnabled
        ? renderStatusOrModeSwitch({
            isRegister,
            localLoginEnabled,
            registrationEnabled,
            labels: mergedLabels,
            onModeChange,
            renderModeSwitch,
          })
        : null}
    </div>
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
