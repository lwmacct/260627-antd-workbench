import Card from "antd/es/card/Card";
import type { CardProps } from "antd/es/card";
import { cx } from "../../shared/cx";

export interface WorkbenchPanelProps extends CardProps {
  fullWidth?: boolean;
}

export function WorkbenchPanel({
  className,
  fullWidth = true,
  ...props
}: WorkbenchPanelProps) {
  return (
    <Card
      className={cx("wb-panel", fullWidth && "wb-panel--full", className)}
      {...props}
    />
  );
}
