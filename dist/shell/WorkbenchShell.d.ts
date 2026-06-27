import { MenuProps } from 'antd';
import { ReactNode } from 'react';
import { WorkbenchBrand } from './WorkbenchHeader';
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
export declare function WorkbenchShell<Key extends string = string>({ actions, activeNavKey, activeNavKeys, brand, children, className, contentClassName, flushContent, navItems, onNavigate, }: WorkbenchShellProps<Key>): import("react").JSX.Element;
//# sourceMappingURL=WorkbenchShell.d.ts.map