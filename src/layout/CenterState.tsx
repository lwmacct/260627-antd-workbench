import type { ReactNode } from "react";
import { cx } from "../internal/cx";

export interface CenterStateProps {
  children: ReactNode;
  className?: string;
}

export function CenterState({ children, className }: CenterStateProps) {
  return <main className={cx("wb-center-state", className)}>{children}</main>;
}

