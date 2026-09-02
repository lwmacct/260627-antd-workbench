import {
  CheckOutlined,
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Descriptions,
  Form,
  Input,
  Popconfirm,
  Skeleton,
  Space,
  Tag,
  Typography,
} from "antd";
import Card from "antd/es/card/Card";
import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import { WorkbenchPage } from "../layout/WorkbenchPage";
import { WorkbenchPanel } from "../layout/WorkbenchPanel";
import type {
  WorkbenchIdentityContact,
  WorkbenchIdentityContactKind,
  WorkbenchIdentityContactOption,
  WorkbenchIdentityContactVerification,
  WorkbenchIdentityProfile,
  WorkbenchIdentityProfileValues,
} from "./model";

export interface WorkbenchIdentityProfilePageProps {
  contactOptions?: Partial<Record<WorkbenchIdentityContactKind, WorkbenchIdentityContactOption>>;
  description?: ReactNode;
  error?: ReactNode;
  loading?: boolean;
  profile?: WorkbenchIdentityProfile;
  title?: ReactNode;
  onConfirmContactVerification(input: {
    code: string;
    kind: WorkbenchIdentityContactKind;
    verificationId: string;
  }): Promise<WorkbenchIdentityProfile | void>;
  onStartContactVerification(input: {
    kind: WorkbenchIdentityContactKind;
    value: string;
  }): Promise<WorkbenchIdentityContactVerification>;
  onUnbindContact?(kind: WorkbenchIdentityContactKind): Promise<void>;
  onUpdateProfile(values: WorkbenchIdentityProfileValues): Promise<WorkbenchIdentityProfile | void> | WorkbenchIdentityProfile | void;
}

interface ProfileFormValues {
  avatarUrl?: string;
  displayName: string;
}

const contactKinds: WorkbenchIdentityContactKind[] = ["phone", "email"];

export function WorkbenchIdentityProfilePage({
  contactOptions,
  description,
  error,
  loading = false,
  profile,
  title,
  onConfirmContactVerification,
  onStartContactVerification,
  onUnbindContact,
  onUpdateProfile,
}: WorkbenchIdentityProfilePageProps) {
  const { messages } = useWorkbenchLocale();
  const [form] = Form.useForm<ProfileFormValues>();
  const [currentProfile, setCurrentProfile] = useState(profile);
  const [profileError, setProfileError] = useState<ReactNode>();
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const resolvedContactOptions = useMemo(
    () => ({
      phone: {
        enabled: true,
        icon: <PhoneOutlined />,
        label: messages.identity.contact.phone,
        placeholder: messages.identity.contact.phonePlaceholder,
        ...contactOptions?.phone,
      },
      email: {
        enabled: true,
        icon: <MailOutlined />,
        label: messages.identity.contact.email,
        placeholder: messages.identity.contact.emailPlaceholder,
        ...contactOptions?.email,
      },
    }),
    [contactOptions?.email, contactOptions?.phone, messages.identity.contact],
  );

  useEffect(() => {
    setCurrentProfile(profile);
    if (profile) {
      form.setFieldsValue({
        avatarUrl: profile.avatarUrl,
        displayName: profile.displayName,
      });
    }
  }, [form, profile]);

  async function submitProfile(values: ProfileFormValues) {
    setProfileError(undefined);
    setProfileSaved(false);
    setProfileSaving(true);
    try {
      const nextProfile = await onUpdateProfile({
        avatarUrl: values.avatarUrl?.trim() || undefined,
        displayName: values.displayName,
      });
      if (nextProfile) setCurrentProfile(nextProfile);
      setProfileSaved(true);
    } catch (nextError) {
      setProfileError(toErrorMessage(nextError));
    } finally {
      setProfileSaving(false);
    }
  }

  if (loading && !currentProfile) {
    return (
      <WorkbenchPage description={description ?? messages.identity.profile.description} title={title ?? messages.identity.profile.title}>
        <WorkbenchPanel>
          <Skeleton active paragraph={{ rows: 8 }} />
        </WorkbenchPanel>
      </WorkbenchPage>
    );
  }

  return (
    <WorkbenchPage
      description={description ?? messages.identity.profile.description}
      title={title ?? messages.identity.profile.title}
    >
      {error || profileError ? (
        <Alert
          showIcon
          title={error ?? profileError}
          type="error"
          style={{ marginBottom: 16 }}
        />
      ) : null}
      {profileSaved ? (
        <Alert
          closable
          showIcon
          title={messages.identity.profile.saved}
          type="success"
          style={{ marginBottom: 16 }}
        />
      ) : null}
      <WorkbenchPanel title={messages.identity.profile.account}>
        <Descriptions
          bordered
          column={1}
          items={[
            { key: "id", label: messages.identity.profile.userId, children: currentProfile?.id ?? "-" },
            { key: "username", label: messages.identity.profile.username, children: currentProfile?.username ?? "-" },
          ]}
          size="small"
        />
        <Form<ProfileFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={(values: ProfileFormValues) => void submitProfile(values)}
        >
          <Form.Item
            label={messages.identity.profile.displayName}
            name="displayName"
            rules={[{ required: true, message: messages.identity.profile.displayNameRequired }]}
          >
            <Input disabled={profileSaving || loading} />
          </Form.Item>
          <Form.Item label={messages.identity.profile.avatarUrl} name="avatarUrl">
            <Input
              disabled={profileSaving || loading}
              placeholder={messages.identity.profile.avatarUrlPlaceholder}
            />
          </Form.Item>
          <Button
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={profileSaving}
            type="primary"
          >
            {messages.identity.profile.save}
          </Button>
        </Form>
      </WorkbenchPanel>

      <div className="wb-identity-profile__contacts">
        {contactKinds.map((kind) => {
          const options = resolvedContactOptions[kind];
          return (
            <ContactBinding
              key={kind}
              contact={currentProfile?.contacts[kind]}
              enabled={options.enabled !== false}
              icon={options.icon}
              kind={kind}
              label={options.label}
              placeholder={options.placeholder}
              validate={options.validate}
              onConfirm={async (input) => {
                const nextProfile = await onConfirmContactVerification(input);
                if (nextProfile) setCurrentProfile(nextProfile);
                return nextProfile;
              }}
              onStart={onStartContactVerification}
              onUnbind={
                onUnbindContact
                  ? async (nextKind) => {
                      await onUnbindContact(nextKind);
                      setCurrentProfile((current) =>
                        current
                          ? {
                              ...current,
                              contacts: { ...current.contacts, [nextKind]: undefined },
                            }
                          : current,
                      );
                    }
                  : undefined
              }
            />
          );
        })}
      </div>
    </WorkbenchPage>
  );
}

interface ContactBindingProps {
  contact?: WorkbenchIdentityContact;
  enabled: boolean;
  icon?: ReactNode;
  kind: WorkbenchIdentityContactKind;
  label?: ReactNode;
  placeholder?: string;
  validate?(value: string): string | undefined;
  onConfirm(input: {
    code: string;
    kind: WorkbenchIdentityContactKind;
    verificationId: string;
  }): Promise<WorkbenchIdentityProfile | void>;
  onStart(input: {
    kind: WorkbenchIdentityContactKind;
    value: string;
  }): Promise<WorkbenchIdentityContactVerification>;
  onUnbind?(kind: WorkbenchIdentityContactKind): Promise<void>;
}

interface ContactFormValues {
  value: string;
}

interface ContactBindingState {
  code: string;
  error?: ReactNode;
  retryAfter: number;
  starting: boolean;
  confirming: boolean;
  unbinding: boolean;
  verificationId?: string;
}

function ContactBinding({
  contact,
  enabled,
  icon,
  kind,
  label,
  placeholder,
  validate,
  onConfirm,
  onStart,
  onUnbind,
}: ContactBindingProps) {
  const { messages } = useWorkbenchLocale();
  const [form] = Form.useForm<ContactFormValues>();
  const [state, setState] = useState<ContactBindingState>({
    code: "",
    retryAfter: 0,
    starting: false,
    confirming: false,
    unbinding: false,
  });

  useEffect(() => {
    if (state.retryAfter <= 0) return;
    const timer = window.setInterval(() => {
      setState((current) => ({
        ...current,
        retryAfter: Math.max(0, current.retryAfter - 1),
      }));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [state.retryAfter]);

  const contactMessages = messages.identity.contact;
  const contactLabel = label ?? (kind === "phone" ? contactMessages.phone : contactMessages.email);

  async function start(values: ContactFormValues) {
    setState((current) => ({ ...current, error: undefined, starting: true }));
    try {
      const result = await onStart({ kind, value: values.value.trim() });
      setState({
        code: "",
        error: undefined,
        retryAfter: result.retryAfterSeconds,
        starting: false,
        confirming: false,
        unbinding: false,
        verificationId: result.verificationId,
      });
    } catch (nextError) {
      setState((current) => ({
        ...current,
        error: toErrorMessage(nextError),
        starting: false,
      }));
    }
  }

  async function confirm() {
    if (!state.verificationId || !state.code.trim()) return;
    setState((current) => ({ ...current, error: undefined, confirming: true }));
    try {
      await onConfirm({
        code: state.code.trim(),
        kind,
        verificationId: state.verificationId,
      });
      form.resetFields();
      setState({
        code: "",
        error: undefined,
        retryAfter: 0,
        starting: false,
        confirming: false,
        unbinding: false,
        verificationId: undefined,
      });
    } catch (nextError) {
      setState((current) => ({
        ...current,
        confirming: false,
        error: toErrorMessage(nextError),
      }));
    }
  }

  async function unbind() {
    if (!onUnbind) return;
    setState((current) => ({ ...current, error: undefined, unbinding: true }));
    try {
      await onUnbind(kind);
    } catch (nextError) {
      setState((current) => ({
        ...current,
        error: toErrorMessage(nextError),
        unbinding: false,
      }));
    }
  }

  const defaultValidation = defaultContactValidation(kind, contactMessages);
  const validation = validate
    ? {
        validator(_: unknown, value?: string) {
          if (!value) {
            return Promise.reject(
              new Error(kind === "phone" ? contactMessages.phoneRequired : contactMessages.emailRequired),
            );
          }
          const message = validate(value);
          return message ? Promise.reject(new Error(message)) : Promise.resolve();
        },
      }
    : defaultValidation;

  return (
    <Card
      title={
        <Space>
          {icon}
          <span>{contactLabel}</span>
        </Space>
      }
      extra={
        contact ? (
          <Tag icon={<CheckOutlined />} color="success">
            {contactMessages.verified}
          </Tag>
        ) : (
          <Tag color={enabled ? "default" : "warning"}>
            {enabled ? contactMessages.unbound : contactMessages.unavailable}
          </Tag>
        )
      }
    >
      {contact ? (
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Typography.Text>{contact.maskedValue}</Typography.Text>
          {contact.verifiedAt ? (
            <Typography.Text type="secondary">
              {contactMessages.verifiedAt(new Date(contact.verifiedAt).toLocaleString())}
            </Typography.Text>
          ) : null}
          {onUnbind ? (
            <Popconfirm
              cancelText={contactMessages.unbindCancel}
              description={contactMessages.unbindDescription}
              okText={contactMessages.unbindConfirm}
              title={contactMessages.unbindTitle}
              onConfirm={() => void unbind()}
            >
              <Button danger icon={<DeleteOutlined />} loading={state.unbinding}>
                {contactMessages.unbind}
              </Button>
            </Popconfirm>
          ) : null}
          {state.error ? <Alert showIcon title={state.error} type="error" /> : null}
        </Space>
      ) : (
        <Form<ContactFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={(values: ContactFormValues) => void start(values)}
        >
          <Form.Item
            label={contactLabel}
            name="value"
            rules={[validation]}
          >
            <Input
              disabled={!enabled || Boolean(state.verificationId) || state.starting}
              prefix={icon}
              placeholder={placeholder}
              type={kind === "phone" ? "tel" : "email"}
            />
          </Form.Item>
          <Space wrap>
            <Button
              disabled={!enabled || state.starting || state.retryAfter > 0}
              htmlType="submit"
              icon={<SendOutlined />}
              loading={state.starting}
            >
              {state.verificationId
                ? state.retryAfter > 0
                  ? contactMessages.resend(state.retryAfter)
                  : contactMessages.resend(0)
                : contactMessages.send}
            </Button>
            {state.verificationId ? (
              <Space.Compact>
                <Input
                  aria-label={String(contactMessages.code)}
                  disabled={state.confirming}
                  maxLength={32}
                  placeholder={String(contactMessages.code)}
                  value={state.code}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setState((current) => ({ ...current, code: event.target.value }))
                  }
                />
                <Button
                  disabled={!state.code.trim()}
                  icon={<CheckOutlined />}
                  loading={state.confirming}
                  type="primary"
                  onClick={() => void confirm()}
                >
                  {contactMessages.confirm}
                </Button>
              </Space.Compact>
            ) : null}
          </Space>
          {state.error ? <Alert showIcon title={state.error} type="error" style={{ marginTop: 16 }} /> : null}
        </Form>
      )}
    </Card>
  );
}

function defaultContactValidation(
  kind: WorkbenchIdentityContactKind,
  messages: ReturnType<typeof useWorkbenchLocale>["messages"]["identity"]["contact"],
) {
  if (kind === "phone") {
    return {
      validator(_: unknown, value?: string) {
        if (!value) return Promise.reject(new Error(messages.phoneRequired));
        return /^\+[1-9][0-9]{6,14}$/.test(value)
          ? Promise.resolve()
          : Promise.reject(new Error(messages.phoneInvalid));
      },
    };
  }
  return {
    type: "email" as const,
    required: true,
    message: messages.emailInvalid,
  };
}

function toErrorMessage(error: unknown): ReactNode {
  return error instanceof Error ? error.message : String(error);
}
