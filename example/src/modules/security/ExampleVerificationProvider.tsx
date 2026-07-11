import type { ReactNode } from "react";
import {
  WorkbenchVerificationProvider,
  type WorkbenchVerificationRequest,
  type WorkbenchVerificationValues,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../shared/i18n";

export function ExampleVerificationProvider({ children }: { children: ReactNode }) {
  const text = useExampleText();

  function verify(values: WorkbenchVerificationValues, _request: WorkbenchVerificationRequest) {
    if (values.kind === "code" && !/^\d{6}$/.test(values.code)) {
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
