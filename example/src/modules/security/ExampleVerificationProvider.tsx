import type { ReactNode } from "react";
import {
  WorkbenchVerificationProvider,
  type WorkbenchVerificationRequest,
  type WorkbenchVerificationSubmitValues,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../shared/i18n";

export function ExampleVerificationProvider({ children }: { children: ReactNode }) {
  const text = useExampleText();

  function verify(values: WorkbenchVerificationSubmitValues, _request: WorkbenchVerificationRequest) {
    if (!/^\d{6}$/.test(values.code ?? "")) {
      throw new Error(String(text.security.verificationLabels.codeInvalid));
    }
  }

  return (
    <WorkbenchVerificationProvider
      surface="modal"
      onVerify={verify}
    >
      {children}
    </WorkbenchVerificationProvider>
  );
}
