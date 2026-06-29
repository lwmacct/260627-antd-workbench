import { Layout } from "antd";
import type { ReactNode } from "react";
import { cx } from "../internal/cx";
import type { WorkbenchNavEntry } from "../navigation/model";
import { Header, type WorkbenchBrand } from "./Header";

export interface AppShellProps {
  actions?: ReactNode;
  brand: WorkbenchBrand;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  flushContent?: boolean;
  nav: WorkbenchNavEntry[];
  selectedNavKey?: string;
  selectedNavKeys?: string[];
  onSelectNav(key: string): void;
}

export function AppShell({
  actions,
  brand,
  children,
  className,
  contentClassName,
  flushContent = false,
  nav,
  selectedNavKey,
  selectedNavKeys,
  onSelectNav,
}: AppShellProps) {
  return (
    <Layout className={cx("wb-shell", className)}>
      <Header
        actions={actions}
        brand={brand}
        nav={nav}
        selectedNavKey={selectedNavKey}
        selectedNavKeys={selectedNavKeys}
        onSelectNav={onSelectNav}
      />
      <Layout.Content
        className={cx(
          "wb-shell__content",
          flushContent && "wb-shell__content--flush",
          contentClassName,
        )}
      >
        {children}
      </Layout.Content>
    </Layout>
  );
}

