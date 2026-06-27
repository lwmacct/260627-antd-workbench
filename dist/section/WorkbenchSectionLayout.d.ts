import { MenuProps } from 'antd';
import { ReactNode } from 'react';
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
export declare function WorkbenchSectionLayout<Key extends string = string>({ activeKey, children, className, contentClassName, drawerTitle, menuItems, mobileActionLabel, siderWidth, onChange, }: WorkbenchSectionLayoutProps<Key>): import("react").JSX.Element;
//# sourceMappingURL=WorkbenchSectionLayout.d.ts.map