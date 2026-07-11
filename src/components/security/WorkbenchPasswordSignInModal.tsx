import { Modal, type ModalProps } from "antd";
import { WorkbenchPasswordSignInForm, type WorkbenchPasswordSignInFormProps } from "./WorkbenchPasswordSignInForm";

export interface WorkbenchPasswordSignInModalProps extends WorkbenchPasswordSignInFormProps {
  modalProps?: Omit<ModalProps, "children" | "footer" | "onCancel" | "open" | "title">;
  open: boolean;
  onCancel?(): void;
}

export function WorkbenchPasswordSignInModal({ modalProps, open, onCancel, ...formProps }: WorkbenchPasswordSignInModalProps) {
  return <Modal centered destroyOnHidden footer={null} open={open} title={null} width={420} onCancel={onCancel} {...modalProps}><WorkbenchPasswordSignInForm {...formProps} /></Modal>;
}
