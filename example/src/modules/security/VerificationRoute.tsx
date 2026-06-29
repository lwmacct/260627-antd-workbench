import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  WorkbenchVerificationPage,
  type WorkbenchVerificationPurpose,
  type WorkbenchVerificationSubmitValues,
} from "@lwmacct/260627-antd-workbench";
import { examplePaths } from "../../app/router/navigation";
import { useExampleText } from "../../shared/i18n";

interface LocationState {
  purpose?: WorkbenchVerificationPurpose;
  rememberMinutes?: number;
  returnTo?: string;
  subject?: string;
}

export function VerificationRoute() {
  const text = useExampleText();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const purpose = state?.purpose ?? "sensitive-action";
  const returnTo = state?.returnTo ?? examplePaths.dashboard;
  const rememberMinutes = state?.rememberMinutes ?? text.security.verificationRememberMinutes;
  const [error, setError] = useState("");

  function submit(values: WorkbenchVerificationSubmitValues) {
    if (!/^\d{6}$/.test(values.code ?? "")) {
      setError(String(text.security.verificationLabels.codeInvalid));
      return;
    }

    setError("");
    navigate(returnTo);
  }

  return (
    <WorkbenchVerificationPage
      description={text.security.verificationDescription(state?.subject)}
      error={error}
      labels={text.security.verificationLabels}
      panelExtra={
        <Button
          className="example-security-back"
          icon={<ArrowLeftOutlined />}
          type="text"
          onClick={() => navigate(purpose === "login" ? "/security/login" : returnTo)}
        >
          {purpose === "login" ? text.security.backToLogin : text.security.back}
        </Button>
      }
      purpose={purpose}
      rememberOption={{ defaultChecked: true, minutes: rememberMinutes }}
      onSubmit={submit}
    />
  );
}
