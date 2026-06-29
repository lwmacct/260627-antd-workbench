import { Modal, type ModalProps } from "antd";
import {
  WorkbenchCredentialForm,
  type WorkbenchCredentialFormProps,
} from "./WorkbenchCredentialForm";

export interface WorkbenchCredentialModalProps extends WorkbenchCredentialFormProps {
  destroyOnHidden?: boolean;
  modalProps?: Omit<
    ModalProps,
    "children" | "destroyOnHidden" | "footer" | "onCancel" | "open" | "title"
  >;
  open: boolean;
  onCancel?(): void;
}

export function WorkbenchCredentialModal({
  destroyOnHidden = true,
  modalProps,
  open,
  onCancel,
  ...formProps
}: WorkbenchCredentialModalProps) {
  return (
    <Modal
      centered
      destroyOnHidden={destroyOnHidden}
      footer={null}
      open={open}
      title={null}
      width={420}
      onCancel={onCancel}
      {...modalProps}
    >
      <WorkbenchCredentialForm {...formProps} />
    </Modal>
  );
}
