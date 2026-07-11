import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Space, Typography } from "antd";
import { useCallback, useState, type ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import { cx } from "../../shared/cx";
import { WorkbenchHumanChallengeField, type WorkbenchHumanChallengeFieldProps } from "./WorkbenchHumanChallengeField";
import type { WorkbenchHumanChallengeConfig, WorkbenchHumanChallengeResponse, WorkbenchImageChallenge, WorkbenchPasswordSignUpValues } from "./model";

interface SignUpFormValues { confirmPassword: string; password: string; username: string }

export interface WorkbenchPasswordSignUpFormProps {
  actions?: ReactNode;
  challenge?: WorkbenchHumanChallengeConfig;
  className?: string;
  createImageChallenge?: () => Promise<WorkbenchImageChallenge>;
  description?: ReactNode;
  error?: ReactNode;
  extraFields?: ReactNode;
  loading?: boolean;
  renderRemoteChallenge?: WorkbenchHumanChallengeFieldProps["renderRemoteChallenge"];
  terms?: ReactNode;
  title?: ReactNode;
  onSubmit(values: WorkbenchPasswordSignUpValues): Promise<void> | void;
}

export function WorkbenchPasswordSignUpForm({ actions, challenge: challengeConfig, className, createImageChallenge, description, error, extraFields, loading = false, renderRemoteChallenge, terms, title, onSubmit }: WorkbenchPasswordSignUpFormProps) {
  const { messages } = useWorkbenchLocale();
  const [form] = Form.useForm<SignUpFormValues>();
  const [challenge, setChallenge] = useState<WorkbenchHumanChallengeResponse>();
  const [challengeError, setChallengeError] = useState<ReactNode>();
  const [challengeResetKey, setChallengeResetKey] = useState(0);
  const resetChallenge = useCallback(() => { setChallenge(undefined); setChallengeError(undefined); setChallengeResetKey((value) => value + 1); }, []);

  async function submit(values: SignUpFormValues) {
    if (challengeConfig && !challenge) return;
    try { await onSubmit({ ...values, challenge }); } catch { resetChallenge(); }
  }

  return <div className={cx("wb-security-form", className)}>
    <Space className="wb-security__header" orientation="vertical" size={4}>
      <Typography.Title level={1}>{title ?? messages.passwordSignUp.title}</Typography.Title>
      <Typography.Text type="secondary">{description ?? messages.passwordSignUp.description}</Typography.Text>
    </Space>
    {challengeError || error ? <Alert className="wb-security__alert" message={challengeError || error} showIcon type="error" /> : null}
    <Form<SignUpFormValues> clearOnDestroy form={form} layout="vertical" requiredMark={false} onFinish={(values: SignUpFormValues) => void submit(values)}>
      <Form.Item label={messages.password.username} name="username" rules={[{ required: true, message: messages.password.usernameRequired }]}><Input autoComplete="username" disabled={loading} prefix={<UserOutlined />} /></Form.Item>
      <Form.Item label={messages.password.password} name="password" rules={[{ required: true, message: messages.password.passwordRequired }, { min: 8, message: messages.password.passwordMinLength }]}><Input.Password autoComplete="new-password" disabled={loading} prefix={<LockOutlined />} /></Form.Item>
      <Form.Item dependencies={["password"]} label={messages.password.confirmPassword} name="confirmPassword" rules={[{ required: true, message: messages.password.confirmPasswordRequired }, ({ getFieldValue }) => ({ validator(_, value) { return !value || getFieldValue("password") === value ? Promise.resolve() : Promise.reject(new Error(messages.password.confirmPasswordMismatch)); } })]}><Input.Password autoComplete="new-password" disabled={loading} prefix={<LockOutlined />} /></Form.Item>
      {extraFields}
      {challengeConfig ? <Form.Item label={messages.humanChallenge.label} required><WorkbenchHumanChallengeField config={challengeConfig} createImageChallenge={createImageChallenge} disabled={loading} renderRemoteChallenge={renderRemoteChallenge} resetKey={challengeResetKey} onChange={setChallenge} onError={setChallengeError} /></Form.Item> : null}
      {terms ? <div className="wb-security__terms">{terms}</div> : null}
      <Button block disabled={Boolean(challengeConfig) && !challenge} htmlType="submit" loading={loading} type="primary">{messages.passwordSignUp.submit}</Button>
    </Form>
    {actions ? <div className="wb-security__actions">{actions}</div> : null}
  </div>;
}
