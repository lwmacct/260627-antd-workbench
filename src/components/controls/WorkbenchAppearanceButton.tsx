import { BgColorsOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex, Tooltip, type DrawerProps } from "antd";
import { useState, type ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import { cx } from "../../shared/cx";
import {
  WorkbenchAppearanceSettings,
  type WorkbenchAppearanceSettingsProps,
} from "../settings/WorkbenchAppearanceSettings";

export interface WorkbenchAppearanceButtonProps {
  className?: string;
  defaultOpen?: boolean;
  drawerProps?: Omit<DrawerProps, "children" | "open" | "onClose" | "rootClassName" | "title">;
  drawerRootClassName?: string;
  open?: boolean;
  settingsProps?: WorkbenchAppearanceSettingsProps;
  title?: ReactNode;
  onOpenChange?(open: boolean): void;
}

export function WorkbenchAppearanceButton({
  className,
  defaultOpen = false,
  drawerProps,
  drawerRootClassName,
  open,
  settingsProps,
  title,
  onOpenChange,
}: WorkbenchAppearanceButtonProps) {
  const { messages } = useWorkbenchLocale();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const resolvedOpen = open ?? internalOpen;
  const resolvedTitle = title ?? messages.appearanceControl.title;

  function setOpen(nextOpen: boolean) {
    if (open === undefined) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  }

  return (
    <>
      <Tooltip title={messages.appearanceControl.open}>
        <Button
          aria-label={messages.appearanceControl.open}
          className={cx("wb-header-action", className)}
          icon={<BgColorsOutlined />}
          onClick={() => setOpen(true)}
        />
      </Tooltip>
      <Drawer
        {...drawerProps}
        open={resolvedOpen}
        rootClassName={cx("wb-appearance-drawer", drawerRootClassName)}
        size={drawerProps?.size ?? 760}
        title={
          <Flex align="center" gap="small">
            <BgColorsOutlined />
            {resolvedTitle}
          </Flex>
        }
        onClose={() => setOpen(false)}
      >
        <WorkbenchAppearanceSettings {...settingsProps} />
      </Drawer>
    </>
  );
}
