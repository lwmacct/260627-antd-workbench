import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import type { ReactNode } from "react";
import { cx } from "../../shared/cx";
import { getNavItemLabel } from "../../navigation/find";
import type { WorkbenchNavEntry } from "../../navigation/model";
import { toAntdMenuItems } from "../../navigation/toAntdMenu";

export interface WorkbenchBrand {
  ariaLabel?: string;
  mark?: ReactNode;
  name: ReactNode;
  subtitle?: ReactNode;
  version?: string;
}

export interface WorkbenchHeaderProps {
  actions?: ReactNode;
  brand: WorkbenchBrand;
  className?: string;
  mobileNavFallback?: ReactNode;
  nav: WorkbenchNavEntry[];
  navAriaLabel?: string;
  selectedNavKey?: string;
  selectedNavKeys?: string[];
  onSelectNav(key: string): void;
}

export function WorkbenchHeader({
  actions,
  brand,
  className,
  mobileNavFallback = "导航",
  nav,
  navAriaLabel = "主导航",
  selectedNavKey,
  selectedNavKeys,
  onSelectNav,
}: WorkbenchHeaderProps) {
  const selectedKeys = selectedNavKeys ?? (selectedNavKey ? [selectedNavKey] : []);
  const selectedKey = selectedKeys[0] ?? "";
  const menuItems = toAntdMenuItems(nav);
  const activeNavLabel = getNavItemLabel(nav, selectedKey, mobileNavFallback);
  const subtitle = brand.subtitle ?? shortenVersion(brand.version);

  return (
    <header className={cx("wb-header", className)}>
      <div className="wb-header__brand" aria-label={brand.ariaLabel ?? asText(brand.name)}>
        <div className="wb-header__brand-mark">{brand.mark ?? defaultBrandMark(brand.name)}</div>
        <div className="wb-header__brand-meta">
          <strong>{brand.name}</strong>
          {subtitle ? <span>{subtitle}</span> : null}
        </div>
      </div>

      <nav className="wb-header__nav" aria-label={navAriaLabel}>
        <Menu
          className="wb-header__nav-full"
          disabledOverflow
          items={menuItems}
          mode="horizontal"
          selectedKeys={selectedKeys}
          onClick={({ key }) => onSelectNav(key)}
        />
        <Dropdown
          menu={{
            items: menuItems,
            selectedKeys,
            onClick: ({ key }) => onSelectNav(key),
          }}
          placement="bottom"
          styles={{ root: { minWidth: "min(240px, calc(100vw - 24px))" } }}
          trigger={["click"]}
        >
          <Button className="wb-header__nav-mobile" icon={<DownOutlined />}>
            {activeNavLabel}
          </Button>
        </Dropdown>
      </nav>

      <div className="wb-header__actions">{actions}</div>
    </header>
  );
}

function defaultBrandMark(name: ReactNode): ReactNode {
  const text = asText(name).trim();
  return text ? text.slice(0, 1).toUpperCase() : "W";
}

function asText(value: ReactNode): string {
  return typeof value === "string" || typeof value === "number" ? String(value) : "Workbench";
}

function shortenVersion(version: string | undefined): string | undefined {
  return version?.split(/[+-]/, 1)[0];
}

