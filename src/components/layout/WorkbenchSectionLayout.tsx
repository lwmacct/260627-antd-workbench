import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, Space, Typography } from "antd";
import { useMemo, useState, type ReactNode } from "react";
import { cx } from "../../shared/cx";
import { findNavItem } from "../../navigation/find";
import type { WorkbenchNavEntry } from "../../navigation/model";
import { useWorkbenchLocale } from "../../locale/context";
import { toAntdMenuItems } from "../../navigation/toAntdMenu";

export interface WorkbenchSectionLayoutProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  nav: WorkbenchNavEntry[];
  selectedKey: string;
  siderWidth?: number;
  onSelect(key: string): void;
}

export function WorkbenchSectionLayout({
  children,
  className,
  contentClassName,
  nav,
  selectedKey,
  siderWidth = 208,
  onSelect,
}: WorkbenchSectionLayoutProps) {
  const { messages } = useWorkbenchLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuItems = useMemo(() => toAntdMenuItems(nav), [nav]);
  const currentItem = findNavItem(nav, selectedKey);

  function handleSelect(key: string) {
    onSelect(key);
    setMobileOpen(false);
  }
  const handleMenuClick = ({ key }: { key: string }) => handleSelect(key);

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
          onClick={handleMenuClick}
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
            aria-label={messages.navigation.sectionNavigation}
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
        title={messages.navigation.sectionNavigation}
      >
        <Menu
          className="wb-section__drawer-menu"
          items={menuItems}
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
        />
      </Drawer>
    </Layout>
  );
}
