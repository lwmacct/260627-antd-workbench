import { ArrowRightOutlined, LockOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { WorkbenchPage, WorkbenchPanel } from "@lwmacct/260627-antd-workbench";
import type { ReactNode } from "react";
import { examplePaths } from "../../../app/router/navigation";
import { useExampleText } from "../../../shared/i18n";

type PageEntry = {
  description: string;
  icon: ReactNode;
  label: string;
  path: string;
};

export function PagesRoute() {
  const text = useExampleText();
  const entries: PageEntry[] = [
    {
      description: text.components.pagesLoginDescription,
      icon: <LockOutlined />,
      label: text.components.pagesLogin,
      path: examplePaths.pages.login,
    },
    {
      description: text.components.pagesIdentityLoginDescription,
      icon: <LockOutlined />,
      label: text.components.pagesIdentityLogin,
      path: examplePaths.pages.identityLogin,
    },
    {
      description: text.components.pagesOAuthDescription,
      icon: <SafetyCertificateOutlined />,
      label: text.components.pagesOAuth,
      path: examplePaths.pages.oauth,
    },
    {
      description: text.components.pagesRegisterDescription,
      icon: <LockOutlined />,
      label: text.components.pagesRegister,
      path: examplePaths.pages.register,
    },
    {
      description: text.components.pagesIdentityRegisterDescription,
      icon: <LockOutlined />,
      label: text.components.pagesIdentityRegister,
      path: examplePaths.pages.identityRegister,
    },
    {
      description: text.components.pagesTokenDescription,
      icon: <SafetyCertificateOutlined />,
      label: text.components.pagesToken,
      path: examplePaths.pages.token,
    },
    {
      description: text.components.pagesAccessDeniedDescription,
      icon: <SafetyCertificateOutlined />,
      label: text.components.pagesAccessDenied,
      path: examplePaths.pages.accessDenied,
    },
    {
      description: text.components.pagesVerifyDescription,
      icon: <SafetyCertificateOutlined />,
      label: text.components.pagesVerify,
      path: examplePaths.pages.verify,
    },
  ];

  return (
    <WorkbenchPage
      description={text.components.pagesDescription}
      title={text.components.pages}
    >
      <WorkbenchPanel>
        <div className="example-pages__list" role="list">
          {entries.map((entry) => (
            <div className="example-pages__item" key={entry.path} role="listitem">
              <span aria-hidden="true" className="example-pages__icon">{entry.icon}</span>
              <div className="example-pages__body">
                <div className="example-pages__heading">
                  <Link className="example-pages__link" to={entry.path}>{entry.label}</Link>
                  <Link
                    aria-label={`${text.components.openPage}: ${entry.label}`}
                    className="example-pages__open"
                    title={text.components.openPage}
                    to={entry.path}
                  >
                    <ArrowRightOutlined />
                  </Link>
                </div>
                <Typography.Text type="secondary">{entry.description}</Typography.Text>
              </div>
            </div>
          ))}
        </div>
        <Typography.Text className="example-pages__path-hint" type="secondary">
          {text.components.pagesPathHint}
        </Typography.Text>
      </WorkbenchPanel>
    </WorkbenchPage>
  );
}
