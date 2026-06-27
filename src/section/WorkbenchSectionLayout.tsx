import { DownOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, Space, Typography, type MenuProps } from "antd";
import { useState, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { findMenuItem } from "../utils/menu";

export interface WorkbenchSectionLayoutProps<Key extends string = string> {
  activeKey: Key;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  drawerTitle?: ReactNode;
  menuItems: MenuProps["items"];
  mobileActionLabel?: ReactNode;
  siderWidth?: number;
  onChange(key: Key): void;
}

export function WorkbenchSectionLayout<Key extends string = string>({
  activeKey,
  children,
  className,
  contentClassName,
  drawerTitle = "切换分区",
  menuItems,
  mobileActionLabel = "切换分区",
  siderWidth = 208,
  onChange,
}: WorkbenchSectionLayoutProps<Key>) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentItem = findMenuItem(menuItems, activeKey);

  function handleChange(key: string) {
    onChange(key as Key);
    setMobileOpen(false);
  }

  return (
    <Layout className={cx("wb-section", className)}>
      <Layout.Sider
        className="wb-section__sider wb-section__sider--desktop"
        theme="dark"
        width={siderWidth}
      >
        <Menu
          className="wb-section__menu"
          items={menuItems}
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={({ key }) => handleChange(key)}
        />
      </Layout.Sider>
      <Layout.Content className={cx("wb-section__content", contentClassName)}>
        <div className="wb-section__mobile-nav">
          <div className="wb-section__mobile-current">
            <Space size={8}>
              {currentItem?.icon}
              <Typography.Text strong>{currentItem?.label ?? activeKey}</Typography.Text>
            </Space>
          </div>
          <Button icon={<DownOutlined />} onClick={() => setMobileOpen(true)}>
            {mobileActionLabel}
          </Button>
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
        title={drawerTitle}
      >
        <Menu
          className="wb-section__drawer-menu"
          items={menuItems}
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={({ key }) => handleChange(key)}
        />
      </Drawer>
    </Layout>
  );
}
