import { Layout } from "antd";
import type { ReactNode } from "react";
import { cx } from "../../shared/cx";
import type { WorkbenchNavEntry } from "../../navigation/model";
import { WorkbenchHeader, type WorkbenchBrand } from "./WorkbenchHeader";

export interface WorkbenchShellProps {
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

export function WorkbenchShell({
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
}: WorkbenchShellProps) {
  return (
    <Layout className={cx("wb-shell", className)}>
      <WorkbenchHeader
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

