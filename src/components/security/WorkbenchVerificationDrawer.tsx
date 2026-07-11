import { Drawer, type DrawerProps } from "antd";
import {
  WorkbenchVerificationForm,
  type WorkbenchVerificationFormProps,
} from "./WorkbenchVerificationForm";

export interface WorkbenchVerificationDrawerProps extends WorkbenchVerificationFormProps {
  destroyOnHidden?: boolean;
  drawerProps?: Omit<
    DrawerProps,
    "children" | "destroyOnHidden" | "footer" | "onClose" | "open" | "title"
  >;
  open: boolean;
  onClose?(): void;
}

export function WorkbenchVerificationDrawer({
  destroyOnHidden = true,
  drawerProps,
  open,
  onClose,
  ...formProps
}: WorkbenchVerificationDrawerProps) {
  return (
    <Drawer
      destroyOnHidden={destroyOnHidden}
      open={open}
      placement="right"
      size={420}
      title={null}
      onClose={onClose}
      {...drawerProps}
    >
      <WorkbenchVerificationForm {...formProps} />
    </Drawer>
  );
}
