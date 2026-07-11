import { Modal, type ModalProps } from "antd";
import { WorkbenchCodeVerificationForm, type WorkbenchCodeVerificationFormProps } from "./WorkbenchCodeVerificationForm";

export interface WorkbenchCodeVerificationModalProps extends WorkbenchCodeVerificationFormProps {
  modalProps?: Omit<ModalProps, "children" | "footer" | "onCancel" | "open" | "title">;
  open: boolean;
  onCancel?(): void;
}
export function WorkbenchCodeVerificationModal({ modalProps, open, onCancel, ...formProps }: WorkbenchCodeVerificationModalProps) {
  return <Modal centered destroyOnHidden footer={null} open={open} title={null} width={420} onCancel={onCancel} {...modalProps}><WorkbenchCodeVerificationForm {...formProps} /></Modal>;
}
