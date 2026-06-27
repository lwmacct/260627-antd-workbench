import {
  LogoutOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, type MenuProps } from "antd";
import type { ReactNode } from "react";
import type { WorkbenchThemeMode } from "../provider/WorkbenchProvider";

export interface WorkbenchUserMenuLabels {
  logout?: ReactNode;
  settings?: ReactNode;
  switchToDark?: ReactNode;
  switchToLight?: ReactNode;
  unnamedUser?: ReactNode;
}

export interface WorkbenchUserMenuProps {
  labels?: WorkbenchUserMenuLabels;
  themeMode?: WorkbenchThemeMode;
  username?: string;
  onLogout(): void;
  onOpenAccount?(): void;
  onToggleTheme?(): void;
}

export function WorkbenchUserMenu({
  labels,
  themeMode,
  username,
  onLogout,
  onOpenAccount,
  onToggleTheme,
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
    onToggleTheme
      ? {
          icon: themeMode === "dark" ? <MoonOutlined /> : <SunOutlined />,
          key: "theme",
          label:
            themeMode === "dark"
              ? labels?.switchToLight || "切换浅色模式"
              : labels?.switchToDark || "切换深色模式",
          onClick: onToggleTheme,
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
