import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Popover, Space, Typography } from "antd";
import { useState, type ReactNode } from "react";
import { cx } from "../../shared/cx";
import { useWorkbenchLocale } from "../../locale/context";

export interface WorkbenchUser {
  avatarUrl?: string;
  displayName?: ReactNode;
  provider?: ReactNode;
  providerIcon?: ReactNode;
  username: ReactNode;
}

export interface WorkbenchUserAction {
  danger?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  key: string;
  label: ReactNode;
  onClick?(): void | Promise<void>;
}

export interface WorkbenchUserMenuProps {
  actions?: WorkbenchUserAction[];
  className?: string;
  logoutLoading?: boolean;
  user: WorkbenchUser;
  onLogout?(): void | Promise<void>;
}

export function WorkbenchUserMenu({
  actions,
  className,
  logoutLoading,
  user,
  onLogout,
}: WorkbenchUserMenuProps) {
  const { messages } = useWorkbenchLocale();
  const [open, setOpen] = useState(false);
  const [pendingLogout, setPendingLogout] = useState(false);
  const displayName = user.displayName ?? user.username;
  const loading = logoutLoading ?? pendingLogout;

  async function handleAction(action: WorkbenchUserAction) {
    await action.onClick?.();
    setOpen(false);
  }

  async function handleLogout() {
    if (!onLogout || loading) return;
    setPendingLogout(true);
    try {
      await onLogout();
      setOpen(false);
    } finally {
      setPendingLogout(false);
    }
  }

  const content = (
    <div className="wb-user-menu__card">
      <div className="wb-user-menu__identity">
        <Avatar className="wb-user-menu__avatar" size={44} src={user.avatarUrl}>
          {toInitial(displayName)}
        </Avatar>
        <div className="wb-user-menu__identity-meta">
          <Typography.Text
            className="wb-user-menu__display-name"
            strong
            title={asTitle(displayName)}
          >
            {displayName}
          </Typography.Text>
          <Typography.Text
            className="wb-user-menu__username"
            title={asTitle(user.username)}
            type="secondary"
          >
            @{user.username}
          </Typography.Text>
          {user.provider ? (
            <Space className="wb-user-menu__provider" size={4}>
              {user.providerIcon}
              <Typography.Text type="secondary">
                {user.provider}
              </Typography.Text>
            </Space>
          ) : null}
        </div>
      </div>

      {actions?.length ? (
        <div className="wb-user-menu__actions">
          <Divider />
          {actions.map((action) => (
            <Button
              key={action.key}
              block
              danger={action.danger}
              disabled={action.disabled}
              icon={action.icon}
              type="text"
              onClick={() => void handleAction(action)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}

      {onLogout ? (
        <div className="wb-user-menu__logout">
          <Divider />
          <Button
            block
            danger
            icon={<LogoutOutlined />}
            loading={loading}
            type="text"
            onClick={() => void handleLogout()}
          >
            {messages.account.logout}
          </Button>
        </div>
      ) : null}
    </div>
  );

  return (
    <Popover
      arrow={false}
      content={content}
      open={open}
      placement="bottomRight"
      trigger="click"
      onOpenChange={setOpen}
    >
      <Button
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={messages.account.menu}
        className={cx("wb-user-menu__trigger", className)}
        shape="circle"
        type="text"
      >
        <Avatar size={30} src={user.avatarUrl}>
          {toInitial(displayName)}
        </Avatar>
      </Button>
    </Popover>
  );
}

function toInitial(value: ReactNode): ReactNode {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim().slice(0, 1).toUpperCase() || "?";
  }
  return <UserOutlined />;
}

function asTitle(value: ReactNode): string | undefined {
  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : undefined;
}
