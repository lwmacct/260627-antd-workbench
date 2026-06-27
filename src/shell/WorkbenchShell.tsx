import { Layout } from "antd";
import type { MenuProps } from "antd";
import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { WorkbenchHeader, type WorkbenchBrand } from "./WorkbenchHeader";

export interface WorkbenchShellProps<Key extends string = string> {
  actions?: ReactNode;
  activeNavKey?: Key;
  activeNavKeys?: Key[];
  brand: WorkbenchBrand;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  flushContent?: boolean;
  navItems: MenuProps["items"];
  onNavigate(key: Key): void;
}

export function WorkbenchShell<Key extends string = string>({
  actions,
  activeNavKey,
  activeNavKeys,
  brand,
  children,
  className,
  contentClassName,
  flushContent = false,
  navItems,
  onNavigate,
}: WorkbenchShellProps<Key>) {
  return (
    <Layout className={cx("wb-shell", className)}>
      <WorkbenchHeader
        actions={actions}
        activeNavKey={activeNavKey}
        activeNavKeys={activeNavKeys}
        brand={brand}
        navItems={navItems}
        onNavigate={onNavigate}
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
