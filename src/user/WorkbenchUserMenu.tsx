import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, type MenuProps } from "antd";
import type { ReactNode } from "react";

export interface WorkbenchUserMenuLabels {
  logout?: ReactNode;
  settings?: ReactNode;
  unnamedUser?: ReactNode;
}

export interface WorkbenchUserMenuProps {
  labels?: WorkbenchUserMenuLabels;
  username?: string;
  onLogout(): void;
  onOpenAccount?(): void;
}

export function WorkbenchUserMenu({
  labels,
  username,
  onLogout,
  onOpenAccount,
}: WorkbenchUserMenuProps) {
  const initial = (username || "?").trim().slice(0, 1).toUpperCase();
  const items: MenuProps["items"] = [
    {
      disabled: true,
      icon: <UserOutlined />,
      key: "user",
      label: username || labels?.unnamedUser || "未命名用户",
    },
    { type: "divider" },
    onOpenAccount
      ? {
          icon: <SettingOutlined />,
          key: "settings",
          label: labels?.settings || "设置",
          onClick: onOpenAccount,
        }
      : null,
    {
      icon: <LogoutOutlined />,
      key: "logout",
      label: labels?.logout || "退出登录",
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
      <Button aria-label="用户菜单" shape="circle" type="text">
        <Avatar size={28} style={{ background: "var(--app-accent)" }}>
          {initial}
        </Avatar>
      </Button>
    </Dropdown>
  );
}
