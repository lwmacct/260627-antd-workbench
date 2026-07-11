import { Drawer, type DrawerProps } from "antd";
import { WorkbenchPasswordSignInForm, type WorkbenchPasswordSignInFormProps } from "./WorkbenchPasswordSignInForm";

export interface WorkbenchPasswordSignInDrawerProps extends WorkbenchPasswordSignInFormProps {
  drawerProps?: Omit<DrawerProps, "children" | "onClose" | "open" | "title">;
  open: boolean;
  onClose?(): void;
}

export function WorkbenchPasswordSignInDrawer({ drawerProps, open, onClose, ...formProps }: WorkbenchPasswordSignInDrawerProps) {
  return <Drawer destroyOnHidden open={open} placement="right" size={420} title={null} onClose={onClose} {...drawerProps}><WorkbenchPasswordSignInForm {...formProps} /></Drawer>;
}
