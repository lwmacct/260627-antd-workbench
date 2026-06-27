import { MenuProps } from 'antd';
import { ReactNode } from 'react';
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
export declare function WorkbenchHeader<Key extends string = string>({ actions, activeNavKey, activeNavKeys, brand, className, mobileNavFallback, navAriaLabel, navItems, onNavigate, }: WorkbenchHeaderProps<Key>): import("react").JSX.Element;
//# sourceMappingURL=WorkbenchHeader.d.ts.map