import { Drawer, type DrawerProps } from "antd";
import { WorkbenchCodeVerificationForm, type WorkbenchCodeVerificationFormProps } from "./WorkbenchCodeVerificationForm";

export interface WorkbenchCodeVerificationDrawerProps extends WorkbenchCodeVerificationFormProps {
  drawerProps?: Omit<DrawerProps, "children" | "onClose" | "open" | "title">;
  open: boolean;
  onClose?(): void;
}
export function WorkbenchCodeVerificationDrawer({ drawerProps, open, onClose, ...formProps }: WorkbenchCodeVerificationDrawerProps) {
  return <Drawer destroyOnHidden open={open} placement="right" size={420} title={null} onClose={onClose} {...drawerProps}><WorkbenchCodeVerificationForm {...formProps} /></Drawer>;
}
