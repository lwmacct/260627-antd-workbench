import { MenuProps } from 'antd';
import { ReactNode } from 'react';
export interface WorkbenchMenuItem {
    icon?: ReactNode;
    key: string;
    label: ReactNode;
}
export declare function findMenuItem(items: MenuProps["items"], activeKey: string): WorkbenchMenuItem | null;
export declare function getMenuItemLabel(items: MenuProps["items"], activeKey: string, fallback: ReactNode): ReactNode;
//# sourceMappingURL=menu.d.ts.map