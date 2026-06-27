import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export interface WorkbenchCenterStateProps {
  children: ReactNode;
  className?: string;
}

export function WorkbenchCenterState({
  children,
  className,
}: WorkbenchCenterStateProps) {
  return <main className={cx("wb-center-state", className)}>{children}</main>;
}
