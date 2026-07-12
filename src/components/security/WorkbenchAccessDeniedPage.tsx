import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Typography } from "antd";
import type { ReactNode } from "react";
import type { WorkbenchUser } from "../account/WorkbenchUserMenu";
import { useWorkbenchLocale } from "../../locale/context";
import { WorkbenchSecurityPage, type WorkbenchSecurityBrand } from "./WorkbenchSecurityPage";

export interface WorkbenchAccessDeniedPageProps {
  actions?: ReactNode;
  brand: WorkbenchSecurityBrand;
  className?: string;
  description?: ReactNode;
  identity: WorkbenchUser;
  logoutLabel?: ReactNode;
  logoutLoading?: boolean;
  panelClassName?: string;
  title?: ReactNode;
  onLogout?(): void;
}

export function WorkbenchAccessDeniedPage({
  actions,
  brand,
  className,
  description,
  identity,
  logoutLabel,
  logoutLoading,
  panelClassName,
  title,
  onLogout,
}: WorkbenchAccessDeniedPageProps) {
  const { messages } = useWorkbenchLocale();
  const displayName = identity.displayName ?? identity.username;
  return (
    <WorkbenchSecurityPage brand={brand} className={className} panelClassName={panelClassName}>
      <div className="wb-access-denied-page__content">
        <div className="wb-access-denied-page__message">
          <Typography.Title level={4}>{title ?? messages.accessDenied.title}</Typography.Title>
          <Typography.Text type="secondary">{description ?? messages.accessDenied.description}</Typography.Text>
        </div>
        <div className="wb-access-denied-page__identity">
          <Avatar size={44} src={identity.avatarUrl}>{toInitial(displayName)}</Avatar>
          <div className="wb-access-denied-page__identity-meta">
            <strong>{displayName}</strong>
            <span>
              {identity.providerIcon ? <span aria-hidden="true" className="wb-access-denied-page__provider-icon">{identity.providerIcon}</span> : null}
              <span>@{identity.username}</span>
              {identity.provider ? <span className="wb-access-denied-page__provider-name">{identity.provider}</span> : null}
            </span>
          </div>
        </div>
        {onLogout ? (
          <Button block icon={<LogoutOutlined />} loading={logoutLoading} onClick={onLogout}>
            {logoutLabel ?? messages.account.logout}
          </Button>
        ) : null}
        {actions ? <div className="wb-access-denied-page__actions">{actions}</div> : null}
      </div>
    </WorkbenchSecurityPage>
  );
}

function toInitial(value: ReactNode): ReactNode {
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim().slice(0, 1).toUpperCase();
  }
  return null;
}
