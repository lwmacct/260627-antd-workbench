import { GithubOutlined, GoogleOutlined, LoginOutlined } from "@ant-design/icons";
import { Button, Space, type ButtonProps } from "antd";
import type { ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import type { WorkbenchOAuthProvider } from "./model";

export interface WorkbenchOAuthProviderButtonsProps {
  block?: boolean;
  className?: string;
  disabled?: boolean;
  loadingProvider?: string;
  loadingText?: ReactNode;
  providers: WorkbenchOAuthProvider[];
  size?: ButtonProps["size"];
  onSelect(provider: WorkbenchOAuthProvider): void;
}

export function WorkbenchOAuthProviderButtons({
  block = true,
  className,
  disabled,
  loadingProvider,
  loadingText,
  providers,
  size,
  onSelect,
}: WorkbenchOAuthProviderButtonsProps) {
  const { messages } = useWorkbenchLocale();
  return (
    <Space className={className ?? "wb-security__oauth-buttons"} orientation="vertical">
      {providers.map((provider) => (
        <Button
          key={provider.provider}
          block={block}
          disabled={disabled || provider.disabled}
          icon={provider.icon ?? defaultOAuthIcon(provider.provider)}
          loading={loadingProvider === provider.provider}
          size={size}
          onClick={() => onSelect(provider)}
        >
          {loadingProvider === provider.provider && loadingText ? loadingText : messages.oauth.loginWith(provider.label)}
        </Button>
      ))}
    </Space>
  );
}

function defaultOAuthIcon(provider: string): ReactNode {
  if (provider === "github") return <GithubOutlined />;
  if (provider === "google") return <GoogleOutlined />;
  return <LoginOutlined />;
}
