import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import type { ReactNode } from "react";
import { cx } from "../../shared/cx";
import { getNavItemLabel } from "../../navigation/find";
import type { WorkbenchNavEntry } from "../../navigation/model";
import { toAntdMenuItems } from "../../navigation/toAntdMenu";
import { WorkbenchHeaderUtilities } from "./WorkbenchHeaderUtilities";

export interface WorkbenchBrand {
  ariaLabel?: string;
  mark?: ReactNode;
  name: ReactNode;
  subtitle?: ReactNode;
  version?: string;
}

export interface WorkbenchHeaderProps {
  account?: ReactNode;
  brand: WorkbenchBrand;
  className?: string;
  mobileNavFallback?: ReactNode;
  nav: WorkbenchNavEntry[];
  navAriaLabel?: string;
  selectedNavKey?: string;
  selectedNavKeys?: string[];
  utilities?: ReactNode;
  onSelectNav(key: string): void;
}

export function WorkbenchHeader({
  account,
  brand,
  className,
  mobileNavFallback = "导航",
  nav,
  navAriaLabel = "主导航",
  selectedNavKey,
  selectedNavKeys,
  utilities,
  onSelectNav,
}: WorkbenchHeaderProps) {
  const selectedKeys = selectedNavKeys ?? (selectedNavKey ? [selectedNavKey] : []);
  const selectedKey = selectedKeys[0] ?? "";
  const menuItems = toAntdMenuItems(nav);
  const activeNavLabel = getNavItemLabel(nav, selectedKey, mobileNavFallback);
  const subtitle = brand.subtitle ?? shortenVersion(brand.version);
  const handleMenuClick = ({ key }: { key: string }) => onSelectNav(key);

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
          onClick={handleMenuClick}
        />
        <Dropdown
          menu={{
            items: menuItems,
            selectedKeys,
            onClick: handleMenuClick,
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

      {utilities || account ? (
        <div className="wb-header__end">
          {utilities ? <WorkbenchHeaderUtilities>{utilities}</WorkbenchHeaderUtilities> : null}
          {account ? <div className="wb-header__account">{account}</div> : null}
        </div>
      ) : null}
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
