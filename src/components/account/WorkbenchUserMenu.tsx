import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, type MenuProps } from "antd";
import type { ReactNode } from "react";

export interface WorkbenchUserMenuLabels {
  account?: ReactNode;
  menu?: string;
  logout?: ReactNode;
  unnamedUser?: ReactNode;
}

export interface WorkbenchUser {
  avatar?: ReactNode;
  initials?: ReactNode;
  name?: ReactNode;
  username?: ReactNode;
}

export interface WorkbenchUserMenuProps {
  items?: MenuProps["items"];
  labels?: WorkbenchUserMenuLabels;
  user?: WorkbenchUser;
  onOpenAccount?(): void;
  onLogout?(): void;
}

export function WorkbenchUserMenu({
  items,
  labels,
  user,
  onOpenAccount,
  onLogout,
}: WorkbenchUserMenuProps) {
  const displayName = user?.name ?? user?.username ?? labels?.unnamedUser ?? "未命名用户";
  const menuItems: MenuProps["items"] = [
    {
      disabled: true,
      icon: <UserOutlined />,
      key: "user",
      label: displayName,
    },
    user?.username && user.username !== displayName
      ? {
          disabled: true,
          key: "username",
          label: user.username,
        }
      : null,
    items || onOpenAccount || onLogout ? { type: "divider" } : null,
    ...(items ?? []),
    onOpenAccount
      ? {
          icon: <SettingOutlined />,
          key: "account",
          label: labels?.account || "账号",
          onClick: onOpenAccount,
        }
      : null,
    onLogout
      ? {
          icon: <LogoutOutlined />,
          key: "logout",
          label: labels?.logout || "退出登录",
          onClick: onLogout,
        }
      : null,
  ];

  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={["click"]}>
      <Button aria-label={labels?.menu ?? "用户菜单"} shape="circle" type="text">
        {user?.avatar ?? (
          <Avatar size={28} style={{ background: "var(--wb-accent)" }}>
            {user?.initials ?? toInitial(displayName)}
          </Avatar>
        )}
      </Button>
    </Dropdown>
  );
}

function toInitial(value: ReactNode): ReactNode {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim().slice(0, 1).toUpperCase() || "?";
  }

  return <UserOutlined />;
}
