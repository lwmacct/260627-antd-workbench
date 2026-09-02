import { DeleteOutlined } from "@ant-design/icons";
import { Alert, Button, Popconfirm, Space, Table, Tag, Typography } from "antd";
import { useState, type ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import { WorkbenchPage } from "../layout/WorkbenchPage";
import { WorkbenchPanel } from "../layout/WorkbenchPanel";
import type { WorkbenchIdentitySession } from "./model";

export interface WorkbenchIdentitySessionsPageProps {
  description?: ReactNode;
  error?: ReactNode;
  loading?: boolean;
  sessions: WorkbenchIdentitySession[];
  title?: ReactNode;
  onRevokeAll?(): Promise<void> | void;
  onRevokeSession?(sessionId: string): Promise<void> | void;
}

export function WorkbenchIdentitySessionsPage({
  description,
  error,
  loading = false,
  sessions,
  title,
  onRevokeAll,
  onRevokeSession,
}: WorkbenchIdentitySessionsPageProps) {
  const { messages } = useWorkbenchLocale();
  const [actionError, setActionError] = useState<ReactNode>();
  const [revokingId, setRevokingId] = useState<string>();
  const [revokingAll, setRevokingAll] = useState(false);
  const sessionsMessages = messages.identity.sessions;
  const activeOtherSessions = sessions.filter((session) => !session.current && !session.revokedAt);

  async function revokeSession(id: string) {
    if (!onRevokeSession) return;
    setActionError(undefined);
    setRevokingId(id);
    try {
      await onRevokeSession(id);
    } catch (nextError) {
      setActionError(toErrorMessage(nextError));
    } finally {
      setRevokingId(undefined);
    }
  }

  async function revokeAll() {
    if (!onRevokeAll) return;
    setActionError(undefined);
    setRevokingAll(true);
    try {
      await onRevokeAll();
    } catch (nextError) {
      setActionError(toErrorMessage(nextError));
    } finally {
      setRevokingAll(false);
    }
  }

  return (
    <WorkbenchPage
      description={description ?? sessionsMessages.description}
      title={title ?? sessionsMessages.title}
    >
      {error || actionError ? (
        <Alert
          showIcon
          title={error ?? actionError}
          type="error"
          style={{ marginBottom: 16 }}
        />
      ) : null}
      <WorkbenchPanel
        extra={
          onRevokeAll && activeOtherSessions.length > 0 ? (
            <Popconfirm
              cancelText={sessionsMessages.revokeAllCancel}
              description={sessionsMessages.revokeAllDescription}
              okText={sessionsMessages.revokeAll}
              title={sessionsMessages.revokeAllTitle}
              onConfirm={() => void revokeAll()}
            >
              <Button danger icon={<DeleteOutlined />} loading={revokingAll}>
                {sessionsMessages.revokeAll}
              </Button>
            </Popconfirm>
          ) : null
        }
      >
        <Table<WorkbenchIdentitySession>
          dataSource={sessions}
          loading={loading}
          locale={{ emptyText: sessionsMessages.noSessions }}
          pagination={false}
          rowKey="id"
          scroll={{ x: 720 }}
          columns={[
            {
              title: sessionsMessages.current,
              dataIndex: "current",
              render: (_current: boolean | undefined, session: WorkbenchIdentitySession) =>
                session.current ? <Tag color="processing">{sessionsMessages.current}</Tag> : null,
            },
            {
              title: sessionsMessages.loginIp,
              dataIndex: "loginIp",
              render: (value: string | undefined) => value ?? "-",
            },
            {
              title: sessionsMessages.lastIp,
              dataIndex: "lastIp",
              render: (value: string | undefined) => value ?? "-",
            },
            {
              title: sessionsMessages.createdAt,
              dataIndex: "createdAt",
              render: (value: string) => formatDate(value),
            },
            {
              title: sessionsMessages.lastSeenAt,
              dataIndex: "lastSeenAt",
              render: (value: string | undefined) => formatDate(value),
            },
            {
              title: sessionsMessages.expiresAt,
              dataIndex: "expiresAt",
              render: (value: string) => formatDate(value),
            },
            {
              title: sessionsMessages.revoked,
              dataIndex: "revokedAt",
              render: (_value: string | undefined, session: WorkbenchIdentitySession) =>
                session.revokedAt ? (
                  <Space orientation="vertical" size={0}>
                    <Tag color="default">{sessionsMessages.revoked}</Tag>
                    {session.revokedReason ? (
                      <Typography.Text type="secondary">
                        {`${String(sessionsMessages.revokedReason)}: ${session.revokedReason}`}
                      </Typography.Text>
                    ) : null}
                  </Space>
                ) : null,
            },
            {
              title: sessionsMessages.revoke,
              key: "action",
              render: (_value: unknown, session: WorkbenchIdentitySession) =>
                onRevokeSession && !session.current && !session.revokedAt ? (
                  <Popconfirm
                    cancelText={sessionsMessages.revokeCancel}
                    description={sessionsMessages.revokeDescription}
                    okText={sessionsMessages.revoke}
                    title={sessionsMessages.revokeTitle}
                    onConfirm={() => void revokeSession(session.id)}
                  >
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      loading={revokingId === session.id}
                      size="small"
                    >
                      {sessionsMessages.revoke}
                    </Button>
                  </Popconfirm>
                ) : null,
            },
          ]}
        />
      </WorkbenchPanel>
    </WorkbenchPage>
  );
}

function formatDate(value?: string) {
  return value ? new Date(value).toLocaleString() : "-";
}

function toErrorMessage(error: unknown): ReactNode {
  return error instanceof Error ? error.message : String(error);
}
