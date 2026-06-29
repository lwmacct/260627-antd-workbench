import type { CSSProperties, ReactNode } from "react";
import { cx } from "../internal/cx";

export interface SplitWorkspaceProps {
  children: ReactNode;
  className?: string;
  collapseOnMobile?: boolean;
  contentClassName?: string;
  sidebar: ReactNode;
  sidebarClassName?: string;
  sidebarPlacement?: "end" | "start";
  sidebarWidth?: number | string;
  viewportClassName?: string;
}

export function SplitWorkspace({
  children,
  className,
  collapseOnMobile = true,
  contentClassName,
  sidebar,
  sidebarClassName,
  sidebarPlacement = "start",
  sidebarWidth = 220,
  viewportClassName,
}: SplitWorkspaceProps) {
  const style = {
    "--wb-split-sidebar-width": toCssSize(sidebarWidth),
  } as CSSProperties;
  const sidebarNode = (
    <aside className={cx("wb-split__sidebar", sidebarClassName)}>{sidebar}</aside>
  );
  const contentNode = (
    <div className={cx("wb-split__content", viewportClassName)}>
      <div className={cx("wb-split__content-body", contentClassName)}>
        {children}
      </div>
    </div>
  );

  return (
    <div
      className={cx(
        "wb-split",
        sidebarPlacement === "end" && "wb-split--end",
        collapseOnMobile && "wb-split--mobile-collapse",
        className,
      )}
      style={style}
    >
      {sidebarPlacement === "start" ? sidebarNode : contentNode}
      {sidebarPlacement === "start" ? contentNode : sidebarNode}
    </div>
  );
}

function toCssSize(value: number | string): string {
  return typeof value === "number" ? `${value}px` : value;
}
