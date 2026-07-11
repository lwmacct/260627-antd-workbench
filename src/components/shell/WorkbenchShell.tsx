import { Layout } from "antd";
import type { ReactNode } from "react";
import { cx } from "../../shared/cx";
import type { WorkbenchNavEntry } from "../../navigation/model";
import { WorkbenchHeader, type WorkbenchBrand } from "./WorkbenchHeader";

export interface WorkbenchShellProps {
  account?: ReactNode;
  brand: WorkbenchBrand;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  flushContent?: boolean;
  nav: WorkbenchNavEntry[];
  selectedNavKey?: string;
  selectedNavKeys?: string[];
  utilities?: ReactNode;
  onSelectNav(key: string): void;
}

export function WorkbenchShell({
  account,
  brand,
  children,
  className,
  contentClassName,
  flushContent = false,
  nav,
  selectedNavKey,
  selectedNavKeys,
  utilities,
  onSelectNav,
}: WorkbenchShellProps) {
  return (
    <Layout className={cx("wb-shell", className)}>
      <WorkbenchHeader
        account={account}
        brand={brand}
        nav={nav}
        selectedNavKey={selectedNavKey}
        selectedNavKeys={selectedNavKeys}
        utilities={utilities}
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
