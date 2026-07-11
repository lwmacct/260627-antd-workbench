import { Alert, Avatar, Button, Flex, Spin, Typography } from "antd";
import Card from "antd/es/card/Card";
import type { ReactNode } from "react";
import { cx } from "../../shared/cx";
import { WorkbenchOAuthButtons } from "./WorkbenchOAuthButtons";
import type { WorkbenchOAuthProvider } from "./model";
import { useWorkbenchLocale } from "../../locale/context";

export interface WorkbenchSignInBrand {
  description?: ReactNode;
  mark?: ReactNode;
  name: ReactNode;
}

export interface WorkbenchOAuthSignInPageProps {
  brand: WorkbenchSignInBrand;
  className?: string;
  error?: ReactNode;
  loadingProvider?: string;
  panelClassName?: string;
  providers: WorkbenchOAuthProvider[];
  onRetry?(): void;
  onSelectProvider(provider: WorkbenchOAuthProvider): void;
}

export function WorkbenchOAuthSignInPage({
  brand,
  className,
  error,
  loadingProvider,
  panelClassName,
  providers,
  onRetry,
  onSelectProvider,
}: WorkbenchOAuthSignInPageProps) {
  const { messages } = useWorkbenchLocale();
  return (
    <main className={cx("wb-security", "wb-oauth-sign-in", className)}>
      <Card className={cx("wb-security__panel", panelClassName)}>
        <Flex align="center" className="wb-oauth-sign-in__brand" gap={12} vertical>
          <Avatar className="wb-oauth-sign-in__mark" size={64}>{brand.mark ?? toMark(brand.name)}</Avatar>
          <Typography.Title level={3}>{brand.name}</Typography.Title>
          {brand.description ? <Typography.Text type="secondary">{brand.description}</Typography.Text> : null}
        </Flex>
        {error ? <Alert className="wb-security__alert" message={error} showIcon type="error" /> : null}
        <WorkbenchOAuthButtons
          className="wb-oauth-sign-in__providers"
          loadingProvider={loadingProvider}
          providers={providers}
          size="large"
          onSelect={onSelectProvider}
        />
        {onRetry ? <Button block type="text" onClick={onRetry}>{messages.auth.retry}</Button> : null}
      </Card>
    </main>
  );
}

export interface WorkbenchAuthCheckingPageProps {
  label?: ReactNode;
}

export function WorkbenchAuthCheckingPage({ label }: WorkbenchAuthCheckingPageProps) {
  return (
    <main className="wb-security wb-auth-checking">
      <Flex align="center" gap={12} vertical>
        <Spin size="large" />
        {label ? <Typography.Text type="secondary">{label}</Typography.Text> : null}
      </Flex>
    </main>
  );
}

function toMark(name: ReactNode): ReactNode {
  return typeof name === "string" || typeof name === "number" ? String(name).trim().slice(0, 1).toUpperCase() : "W";
}
