import { Modal, type ModalProps } from "antd";
import type { WorkbenchVerificationLabels } from "./labels";
import {
  WorkbenchVerificationForm,
  type WorkbenchVerificationFormProps,
} from "./WorkbenchVerificationForm";

export interface WorkbenchVerificationModalProps extends WorkbenchVerificationFormProps {
  destroyOnHidden?: boolean;
  labels?: WorkbenchVerificationLabels;
  modalProps?: Omit<
    ModalProps,
    "children" | "destroyOnHidden" | "footer" | "onCancel" | "open" | "title"
  >;
  open: boolean;
  onCancel?(): void;
}

export function WorkbenchVerificationModal({
  destroyOnHidden = true,
  labels,
  modalProps,
  open,
  onCancel,
  ...formProps
}: WorkbenchVerificationModalProps) {
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
      <WorkbenchVerificationForm labels={labels} {...formProps} />
    </Modal>
  );
}
