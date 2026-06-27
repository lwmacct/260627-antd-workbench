import { ReactNode } from 'react';
export interface WorkbenchPageProps {
    children: ReactNode;
    className?: string;
    contentClassName?: string;
    description?: ReactNode;
    extra?: ReactNode;
    title?: ReactNode;
    toolbar?: ReactNode;
}
export declare function WorkbenchPage({ children, className, contentClassName, description, extra, title, toolbar, }: WorkbenchPageProps): import("react").JSX.Element;
//# sourceMappingURL=WorkbenchPage.d.ts.map