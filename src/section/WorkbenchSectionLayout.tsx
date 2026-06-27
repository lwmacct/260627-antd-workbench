import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Space, Typography, type MenuProps } from "antd";
import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { findMenuItem } from "../utils/menu";

export interface WorkbenchSectionLayoutProps<Key extends string = string> {
  activeKey: Key;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
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
  menuItems,
  mobileActionLabel = "切换分区",
  siderWidth = 208,
  onChange,
}: WorkbenchSectionLayoutProps<Key>) {
  const currentItem = findMenuItem(menuItems, activeKey);

  function handleChange(key: string) {
    onChange(key as Key);
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
          <Dropdown
            menu={{
              items: menuItems,
              onClick: ({ key }) => handleChange(key),
              selectedKeys: [activeKey],
            }}
            placement="bottomRight"
            styles={{ root: { minWidth: 220 } }}
            trigger={["click"]}
          >
            <Button icon={<DownOutlined />}>{mobileActionLabel}</Button>
          </Dropdown>
        </div>
        {children}
      </Layout.Content>
    </Layout>
  );
}
