import { Button, Typography } from "antd";
import type { ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import { WorkbenchOAuthProviderButtons } from "./WorkbenchOAuthProviderButtons";
import { WorkbenchSecurityPage, type WorkbenchSecurityBrand } from "./WorkbenchSecurityPage";
import type { WorkbenchOAuthProvider } from "./model";

export interface WorkbenchOAuthSignInPageProps {
  brand: WorkbenchSecurityBrand;
  className?: string;
  error?: ReactNode;
  hint?: ReactNode;
  panelClassName?: string;
  pendingProvider?: string;
  providers: WorkbenchOAuthProvider[];
  retry?: boolean;
  onRetry?(): void;
  onSelectProvider(provider: WorkbenchOAuthProvider): void;
}

export function WorkbenchOAuthSignInPage({
  brand,
  className,
  error,
  hint,
  panelClassName,
  pendingProvider,
  providers,
  retry,
  onRetry,
  onSelectProvider,
}: WorkbenchOAuthSignInPageProps) {
  const { messages } = useWorkbenchLocale();
  return (
    <WorkbenchSecurityPage brand={brand} className={className} error={error} panelClassName={panelClassName}>
      <div aria-live="polite" className="wb-oauth-sign-in-page__content">
        <WorkbenchOAuthProviderButtons
          disabled={Boolean(pendingProvider)}
          loadingProvider={pendingProvider}
          loadingText={messages.auth.signingIn}
          providers={providers}
          size="large"
          onSelect={onSelectProvider}
        />
        {hint ? <Typography.Text className="wb-oauth-sign-in-page__hint" type="secondary">{hint}</Typography.Text> : null}
        {retry && onRetry ? <Button block type="text" onClick={onRetry}>{messages.auth.retry}</Button> : null}
      </div>
    </WorkbenchSecurityPage>
  );
}
