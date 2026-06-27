import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, type MenuProps } from "antd";
import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { getMenuItemLabel } from "../utils/menu";

export interface WorkbenchBrand {
  ariaLabel?: string;
  mark?: ReactNode;
  name: ReactNode;
  subtitle?: ReactNode;
  version?: string;
}

export interface WorkbenchHeaderProps<Key extends string = string> {
  actions?: ReactNode;
  activeNavKey?: Key;
  activeNavKeys?: Key[];
  brand: WorkbenchBrand;
  className?: string;
  mobileNavFallback?: ReactNode;
  navAriaLabel?: string;
  navItems: MenuProps["items"];
  onNavigate(key: Key): void;
}

export function WorkbenchHeader<Key extends string = string>({
  actions,
  activeNavKey,
  activeNavKeys,
  brand,
  className,
  mobileNavFallback = "导航",
  navAriaLabel = "主导航",
  navItems,
  onNavigate,
}: WorkbenchHeaderProps<Key>) {
  const selectedKeys = activeNavKeys ?? (activeNavKey ? [activeNavKey] : []);
  const selectedKey = selectedKeys[0] ?? "";
  const activeNavLabel = getMenuItemLabel(navItems, selectedKey, mobileNavFallback);
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
          items={navItems}
          mode="horizontal"
          onClick={({ key }) => onNavigate(key as Key)}
          selectedKeys={selectedKeys}
        />
        <Dropdown
          classNames={{ root: "wb-header__dropdown wb-header__nav-mobile-popup" }}
          menu={{
            items: navItems,
            onClick: ({ key }) => onNavigate(key as Key),
            selectedKeys,
          }}
          placement="bottom"
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
