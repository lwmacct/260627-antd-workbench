import { Alert, Avatar, Typography } from "antd";
import Card from "antd/es/card/Card";
import type { ReactNode } from "react";
import { cx } from "../../shared/cx";

export interface WorkbenchSecurityBrand {
  description?: ReactNode;
  mark?: ReactNode;
  name: ReactNode;
}

export interface WorkbenchSecurityPageProps {
  brand?: WorkbenchSecurityBrand;
  children: ReactNode;
  className?: string;
  error?: ReactNode;
  panelClassName?: string;
  panelExtra?: ReactNode;
}

export function WorkbenchSecurityPage({
  brand,
  children,
  className,
  error,
  panelClassName,
  panelExtra,
}: WorkbenchSecurityPageProps) {
  return (
    <main className={cx("wb-security", className)}>
      <Card className={cx("wb-security__panel", panelClassName)}>
        {panelExtra ? <div className="wb-security__panel-extra">{panelExtra}</div> : null}
        {brand ? (
          <div className="wb-security__brand">
            <Avatar className="wb-security__brand-mark" size={64}>
              {brand.mark ?? toMark(brand.name)}
            </Avatar>
            <Typography.Title level={3}>{brand.name}</Typography.Title>
            {brand.description ? <Typography.Text type="secondary">{brand.description}</Typography.Text> : null}
          </div>
        ) : null}
        {error ? <Alert className="wb-security__alert" message={error} showIcon type="error" /> : null}
        {children}
      </Card>
    </main>
  );
}

function toMark(name: ReactNode): ReactNode {
  return typeof name === "string" || typeof name === "number" ? String(name).trim().slice(0, 1).toUpperCase() : "W";
}
