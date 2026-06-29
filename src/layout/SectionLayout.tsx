import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, Space, Typography } from "antd";
import { useMemo, useState, type ReactNode } from "react";
import { cx } from "../internal/cx";
import { findNavItem } from "../navigation/find";
import type { WorkbenchNavEntry } from "../navigation/model";
import { toAntdMenuItems } from "../navigation/toAntdMenu";

export interface SectionLayoutProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  labels?: SectionLayoutLabels;
  nav: WorkbenchNavEntry[];
  selectedKey: string;
  siderWidth?: number;
  onSelect(key: string): void;
}

export interface SectionLayoutLabels {
  mobileNavigation?: string;
  openNavigation?: string;
}

export function SectionLayout({
  children,
  className,
  contentClassName,
  labels,
  nav,
  selectedKey,
  siderWidth = 208,
  onSelect,
}: SectionLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuItems = useMemo(() => toAntdMenuItems(nav), [nav]);
  const currentItem = findNavItem(nav, selectedKey);
  const labelText = {
    mobileNavigation: labels?.mobileNavigation ?? "分区导航",
    openNavigation: labels?.openNavigation ?? "分区导航",
  };

  function handleSelect(key: string) {
    onSelect(key);
    setMobileOpen(false);
  }

  return (
    <Layout className={cx("wb-section", className)}>
      <Layout.Sider
        className="wb-section__sider wb-section__sider--desktop"
        width={siderWidth}
      >
        <Menu
          className="wb-section__menu"
          items={menuItems}
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleSelect(key)}
        />
      </Layout.Sider>
      <Layout.Content className={cx("wb-section__content", contentClassName)}>
        <div className="wb-section__mobile-nav">
          <div className="wb-section__mobile-current">
            <Space size={8}>
              {currentItem?.icon}
              <Typography.Text strong>{currentItem?.label ?? selectedKey}</Typography.Text>
            </Space>
          </div>
          <Button
            aria-label={labelText.openNavigation}
            className="wb-section__mobile-trigger"
            icon={<MenuOutlined />}
            shape="circle"
            type="text"
            onClick={() => setMobileOpen(true)}
          />
        </div>
        {children}
      </Layout.Content>
      <Drawer
        className="wb-section__drawer"
        closable
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        placement="bottom"
        size="default"
        title={labelText.mobileNavigation}
      >
        <Menu
          className="wb-section__drawer-menu"
          items={menuItems}
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleSelect(key)}
        />
      </Drawer>
    </Layout>
  );
}

