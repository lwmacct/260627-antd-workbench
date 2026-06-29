import { Drawer, type DrawerProps } from "antd";
import {
  WorkbenchCredentialForm,
  type WorkbenchCredentialFormProps,
} from "./WorkbenchCredentialForm";

export interface WorkbenchCredentialDrawerProps extends WorkbenchCredentialFormProps {
  destroyOnHidden?: boolean;
  drawerProps?: Omit<
    DrawerProps,
    "children" | "destroyOnHidden" | "footer" | "onClose" | "open" | "title"
  >;
  open: boolean;
  onClose?(): void;
}

export function WorkbenchCredentialDrawer({
  destroyOnHidden = true,
  drawerProps,
  open,
  onClose,
  ...formProps
}: WorkbenchCredentialDrawerProps) {
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
      <WorkbenchCredentialForm {...formProps} />
    </Drawer>
  );
}
