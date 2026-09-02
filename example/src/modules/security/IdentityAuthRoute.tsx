import { ArrowLeftOutlined, DeploymentUnitOutlined } from "@ant-design/icons";
import {
  WorkbenchIdentitySignInPage,
  WorkbenchIdentitySignUpPage,
} from "@lwmacct/260627-antd-workbench/identity";
import { Button, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { examplePaths } from "../../app/router/navigation";
import { useExampleText } from "../../shared/i18n";
import { createExampleImageChallenge } from "../../shared/securityDemo";

const challenge = { provider: "image" } as const;

export function IdentityAuthRoute({ mode }: { mode: "login" | "register" }) {
  const text = useExampleText();
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const panelExtra = (
    <Button
      icon={<ArrowLeftOutlined />}
      type="text"
      onClick={() => navigate(examplePaths.components)}
    >
      {text.security.back}
    </Button>
  );
  const aside = (
    <div className="example-security-promo">
      <div className="example-security-promo__eyebrow">
        <span aria-hidden="true" className="example-security-promo__mark">
          <DeploymentUnitOutlined />
        </span>
        <Typography.Text>{text.security.promo.eyebrow}</Typography.Text>
      </div>
      <Typography.Title level={2}>{text.security.promo.title}</Typography.Title>
      <Typography.Paragraph type="secondary">
        {text.security.promo.description}
      </Typography.Paragraph>
    </div>
  );

  if (mode === "register") {
    return (
      <WorkbenchIdentitySignUpPage
        actions={
          <Button type="link" onClick={() => navigate(examplePaths.pages.identityLogin)}>
            {text.security.backToLogin}
          </Button>
        }
        aside={aside}
        challenge={challenge}
        createImageChallenge={createExampleImageChallenge}
        error={error}
        panelExtra={panelExtra}
        onSubmit={async (values) => {
          setError(undefined);
          await wait();
          if (values.username === "error") {
            setError("This example username is reserved.");
            throw new Error("reserved username");
          }
          navigate(examplePaths.dashboard);
        }}
      />
    );
  }

  return (
    <WorkbenchIdentitySignInPage
      actions={
        <Button type="link" onClick={() => navigate(examplePaths.pages.identityRegister)}>
          {text.components.pagesRegister}
        </Button>
      }
      aside={aside}
      challenge={challenge}
      createImageChallenge={createExampleImageChallenge}
      error={error}
      panelExtra={panelExtra}
      onSubmit={async (values) => {
        setError(undefined);
        await wait();
        if (values.identifier === "error") {
          setError("This example identifier is rejected.");
          throw new Error("rejected identifier");
        }
        navigate(examplePaths.dashboard);
      }}
    />
  );
}

function wait() {
  return new Promise<void>((resolve) => window.setTimeout(resolve, 300));
}
