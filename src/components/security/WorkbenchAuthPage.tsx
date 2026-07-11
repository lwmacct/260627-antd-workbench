import { Alert, Avatar, Button, Flex, Spin, Typography } from "antd";
import Card from "antd/es/card/Card";
import { useEffect, useState, type ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import { cx } from "../../shared/cx";
import { WorkbenchOAuthButtons } from "./WorkbenchOAuthButtons";
import type { WorkbenchOAuthProvider } from "./model";

export interface WorkbenchAuthBrand {
  description?: ReactNode;
  mark?: ReactNode;
  name: ReactNode;
}

export type WorkbenchAuthPageState =
  | { status: "checking" }
  | { status: "ready"; error?: ReactNode; retry?: boolean }
  | { status: "signing-in"; provider: string };

export interface WorkbenchAuthPageProps {
  brand: WorkbenchAuthBrand;
  className?: string;
  hint?: ReactNode;
  panelClassName?: string;
  providers: WorkbenchOAuthProvider[];
  state: WorkbenchAuthPageState;
  onRetry?(): void;
  onSelectProvider(provider: WorkbenchOAuthProvider): void;
}

export function WorkbenchAuthPage({
  brand,
  className,
  hint,
  panelClassName,
  providers,
  state,
  onRetry,
  onSelectProvider,
}: WorkbenchAuthPageProps) {
  const { messages } = useWorkbenchLocale();
  const showChecking = useDelayedValue(state.status === "checking", 180);
  const signingIn = state.status === "signing-in";

  return (
    <main className={cx("wb-security", "wb-auth-page", className)}>
      <Card className={cx("wb-security__panel", panelClassName)}>
        <Flex align="center" className="wb-auth-page__brand" gap={12} vertical>
          <Avatar className="wb-auth-page__mark" size={64}>
            {brand.mark ?? toMark(brand.name)}
          </Avatar>
          <Typography.Title level={3}>{brand.name}</Typography.Title>
          {brand.description ? <Typography.Text type="secondary">{brand.description}</Typography.Text> : null}
        </Flex>

        <div aria-live="polite" className="wb-auth-page__content">
          {state.status === "checking" ? (
            showChecking ? <AuthProgress label={messages.auth.checking} /> : null
          ) : (
            <>
              {state.status === "ready" && state.error ? (
                <Alert className="wb-security__alert" message={state.error} showIcon type="error" />
              ) : null}
              <WorkbenchOAuthButtons
                className="wb-auth-page__providers"
                disabled={signingIn}
                loadingProvider={signingIn ? state.provider : undefined}
                loadingText={messages.auth.signingIn}
                providers={providers}
                size="large"
                onSelect={onSelectProvider}
              />
              {state.status === "ready" && hint ? (
                <Typography.Text className="wb-auth-page__hint" type="secondary">{hint}</Typography.Text>
              ) : null}
              {state.status === "ready" && state.retry && onRetry ? (
                <Button block type="text" onClick={onRetry}>{messages.auth.retry}</Button>
              ) : null}
            </>
          )}
        </div>
      </Card>
    </main>
  );
}

function AuthProgress({ label }: { label: ReactNode }) {
  return (
    <Flex align="center" className="wb-auth-page__progress" gap={10} justify="center">
      <Spin size="small" />
      <Typography.Text type="secondary">{label}</Typography.Text>
    </Flex>
  );
}

function useDelayedValue(value: boolean, delay: number) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!value) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay, value]);
  return visible;
}

function toMark(name: ReactNode): ReactNode {
  return typeof name === "string" || typeof name === "number" ? String(name).trim().slice(0, 1).toUpperCase() : "W";
}
