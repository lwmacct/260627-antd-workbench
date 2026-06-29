import { GithubOutlined, GoogleOutlined, LoginOutlined } from "@ant-design/icons";
import { Button, Space, type ButtonProps } from "antd";
import type { ReactNode } from "react";
import {
  defaultWorkbenchOAuthButtonsLabels,
  type WorkbenchOAuthButtonsLabels,
} from "./labels";
import type { WorkbenchOAuthProvider } from "./model";

export interface WorkbenchOAuthButtonsProps {
  block?: boolean;
  className?: string;
  disabled?: boolean;
  labels?: WorkbenchOAuthButtonsLabels;
  loadingProvider?: string;
  providers: WorkbenchOAuthProvider[];
  size?: ButtonProps["size"];
  onSelect(provider: WorkbenchOAuthProvider): void;
}

export function WorkbenchOAuthButtons({
  block = true,
  className,
  disabled,
  labels,
  loadingProvider,
  providers,
  size,
  onSelect,
}: WorkbenchOAuthButtonsProps) {
  const mergedLabels = { ...defaultWorkbenchOAuthButtonsLabels, ...labels };

  if (providers.length === 0) {
    return null;
  }

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
          {mergedLabels.loginWith(provider.label)}
        </Button>
      ))}
    </Space>
  );
}

function defaultOAuthIcon(provider: string): ReactNode {
  if (provider === "github") {
    return <GithubOutlined />;
  }
  if (provider === "google") {
    return <GoogleOutlined />;
  }
  return <LoginOutlined />;
}
