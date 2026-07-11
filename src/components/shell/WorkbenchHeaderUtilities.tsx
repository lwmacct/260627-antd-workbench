import type { ReactNode } from "react";
import { cx } from "../../shared/cx";

export interface WorkbenchHeaderUtilitiesProps {
  children: ReactNode;
  className?: string;
}

export function WorkbenchHeaderUtilities({ children, className }: WorkbenchHeaderUtilitiesProps) {
  return <div className={cx("wb-header-utilities", className)}>{children}</div>;
}
