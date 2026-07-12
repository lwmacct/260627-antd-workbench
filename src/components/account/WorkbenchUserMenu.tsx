import { LoadingOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Tooltip, type DropdownProps, type MenuProps } from "antd";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import { cx } from "../../shared/cx";

export interface WorkbenchUser {
  avatarUrl?: string;
  displayName?: ReactNode;
  provider?: ReactNode;
  providerIcon?: ReactNode;
  username: ReactNode;
}

interface WorkbenchUserMenuItemBase {
  disabled?: boolean;
  icon?: ReactNode;
  key: string;
  label: ReactNode;
}

export interface WorkbenchUserMenuActionItem extends WorkbenchUserMenuItemBase {
  danger?: boolean;
  kind: "action";
  onSelect(): Promise<void> | void;
}

export interface WorkbenchUserMenuLinkItem extends WorkbenchUserMenuItemBase {
  href: string;
  kind: "link";
  rel?: string;
  target?: string;
}

export type WorkbenchUserMenuItem = WorkbenchUserMenuActionItem | WorkbenchUserMenuLinkItem;

export interface WorkbenchUserMenuGroup {
  items: WorkbenchUserMenuItem[];
  key: string;
}

export interface WorkbenchUserMenuProps {
  className?: string;
  groups?: WorkbenchUserMenuGroup[];
  logoutLoading?: boolean;
  user: WorkbenchUser;
  onLogout?(): Promise<void> | void;
}

const logoutKey = "__workbench_logout__";

export function WorkbenchUserMenu({
  className,
  groups = [],
  logoutLoading,
  user,
  onLogout,
}: WorkbenchUserMenuProps) {
  const { messages } = useWorkbenchLocale();
  const [open, setOpen] = useState(false);
  const [pendingKey, setPendingKey] = useState<string>();
  const displayName = user.displayName ?? user.username;
  const pendingLogout = logoutLoading ?? pendingKey === logoutKey;
  const actionByKey = useMemo(
    () => new Map(
      groups.flatMap((group) => group.items)
        .filter((item): item is WorkbenchUserMenuActionItem => item.kind === "action")
        .map((item) => [item.key, item]),
    ),
    [groups],
  );

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      document.querySelector<HTMLElement>(".wb-user-menu__popup [role='menuitem']:not([aria-disabled='true'])")?.focus();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [open]);

  async function runAction(key: string, action: () => Promise<void> | void) {
    if (pendingKey || logoutLoading) return;
    setPendingKey(key);
    try {
      await action();
      setOpen(false);
    } finally {
      setPendingKey(undefined);
    }
  }

  function handleMenuClick({ key }: { key: string }) {
    if (key === logoutKey && onLogout) {
      void runAction(key, onLogout);
      return;
    }
    const action = actionByKey.get(key);
    if (action) {
      void runAction(key, action.onSelect);
    } else {
      setOpen(false);
    }
  }

  const menuItems: MenuProps["items"] = [];
  groups.forEach((group, groupIndex) => {
    if (!group.items.length) return;
    if (groupIndex > 0 && menuItems.length) menuItems.push({ key: `${group.key}:divider`, type: "divider" });
    group.items.forEach((item) => {
      menuItems.push({
        danger: item.kind === "action" ? item.danger : undefined,
        disabled: item.disabled || Boolean(pendingKey) || Boolean(logoutLoading),
        icon: pendingKey === item.key ? <LoadingOutlined spin /> : item.icon,
        key: item.key,
        label: item.kind === "link" ? (
          <a href={item.href} rel={item.rel} target={item.target}>{item.label}</a>
        ) : item.label,
      });
    });
  });
  if (onLogout) {
    if (menuItems.length) menuItems.push({ key: `${logoutKey}:divider`, type: "divider" });
    menuItems.push({
      disabled: Boolean(pendingKey) || Boolean(logoutLoading),
      icon: pendingLogout ? <LoadingOutlined spin /> : <LogoutOutlined />,
      key: logoutKey,
      label: messages.account.logout,
    });
  }

  const identity = (
    <div className="wb-user-menu__identity">
      <Avatar className="wb-user-menu__avatar" size={32} src={user.avatarUrl}>
        {toInitial(displayName)}
      </Avatar>
      <div className="wb-user-menu__identity-meta">
        <strong className="wb-user-menu__display-name" title={asTitle(displayName)}>{displayName}</strong>
        <span className="wb-user-menu__secondary">
          {user.providerIcon ? <span aria-hidden="true" className="wb-user-menu__provider-icon">{user.providerIcon}</span> : null}
          <span className="wb-user-menu__username" title={asTitle(user.username)}>@{user.username}</span>
          {user.provider ? <span className="wb-user-menu__visually-hidden">{user.provider}</span> : null}
        </span>
      </div>
    </div>
  );

  return (
    <Dropdown
      autoFocus
      classNames={{
        item: "wb-user-menu__item",
        root: "wb-user-menu__popup",
      }}
      destroyOnHidden
      menu={{ items: menuItems, onClick: handleMenuClick }}
      open={open}
      placement="bottomRight"
      popupRender={(menu: ReactNode) => <div className="wb-user-menu__card">{identity}{menu}</div>}
      trigger={["click"]}
      onOpenChange={(nextOpen: boolean, info: Parameters<NonNullable<DropdownProps["onOpenChange"]>>[1]) => {
        if (info.source === "trigger") setOpen(nextOpen);
      }}
    >
      <Tooltip destroyOnHidden open={open ? false : undefined} title={messages.account.openMenu}>
        <Button
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={messages.account.openMenu}
          className={cx("wb-user-menu__trigger", className)}
          shape="circle"
          type="text"
        >
          <Avatar size={30} src={user.avatarUrl}>{toInitial(displayName)}</Avatar>
        </Button>
      </Tooltip>
    </Dropdown>
  );
}

function toInitial(value: ReactNode): ReactNode {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim().slice(0, 1).toUpperCase() || "?";
  }
  return <UserOutlined />;
}

function asTitle(value: ReactNode): string | undefined {
  return typeof value === "string" || typeof value === "number" ? String(value) : undefined;
}
