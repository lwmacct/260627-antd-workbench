import { DownOutlined } from "@ant-design/icons";
import { Breadcrumb, Drawer, Layout, Menu, Space, type MenuProps } from "antd";
import { useState, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { findMenuItem } from "../utils/menu";

export interface WorkbenchSectionLayoutProps<Key extends string = string> {
  activeKey: Key;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  menuItems: MenuProps["items"];
  siderWidth?: number;
  onChange(key: Key): void;
}

export function WorkbenchSectionLayout<Key extends string = string>({
  activeKey,
  children,
  className,
  contentClassName,
  menuItems,
  siderWidth = 208,
  onChange,
}: WorkbenchSectionLayoutProps<Key>) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentItem = findMenuItem(menuItems, activeKey);

  function handleChange(key: string) {
    onChange(key as Key);
    setMobileOpen(false);
  }

  const currentLabel = currentItem?.label ?? activeKey;
  const currentLabelText = typeof currentLabel === "string" ? currentLabel : undefined;

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
          <Breadcrumb
            items={[
              {
                title: (
                  <button
                    type="button"
                    aria-label={
                      currentLabelText
                        ? `打开分区导航，当前分区：${currentLabelText}`
                        : "打开分区导航"
                    }
                    className="wb-section__mobile-breadcrumb-trigger"
                    onClick={() => setMobileOpen(true)}
                  >
                    <Space size={8}>
                      {currentItem?.icon}
                      <span className="wb-section__mobile-breadcrumb-label">{currentLabel}</span>
                      <DownOutlined className="wb-section__mobile-breadcrumb-icon" />
                    </Space>
                  </button>
                ),
              },
            ]}
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
        title="分区导航"
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
