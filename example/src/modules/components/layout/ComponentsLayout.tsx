import {
  KeyOutlined,
  LockOutlined,
  LoginOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import {
  WorkbenchSectionLayout,
  type WorkbenchNavEntry,
} from "@lwmacct/260627-antd-workbench";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useExampleText } from "../../../shared/i18n";

type ComponentSectionKey =
  | "challenge-field"
  | "credential-drawer"
  | "credential-form"
  | "credential-modal"
  | "verification-drawer"
  | "verification-form"
  | "verification-modal"
  | "verification-provider";

const componentSectionKeys = [
  "credential-form",
  "credential-modal",
  "credential-drawer",
  "verification-form",
  "verification-modal",
  "verification-drawer",
  "verification-provider",
  "challenge-field",
] as const;

const componentKeys = new Set<ComponentSectionKey>(componentSectionKeys);

export function ComponentsLayout() {
  const text = useExampleText();
  const location = useLocation();
  const navigate = useNavigate();
  const nav: WorkbenchNavEntry[] = [
    {
      children: [
        {
          icon: <LoginOutlined />,
          key: "credential-form",
          label: text.components.credentialForm,
        },
        {
          icon: <LoginOutlined />,
          key: "credential-modal",
          label: text.components.credentialModal,
        },
        {
          icon: <LoginOutlined />,
          key: "credential-drawer",
          label: text.components.credentialDrawer,
        },
      ],
      key: "credential",
      label: text.components.credentialGroup,
      type: "group",
    },
    {
      children: [
        {
          icon: <SafetyCertificateOutlined />,
          key: "verification-form",
          label: text.components.verificationForm,
        },
        {
          icon: <SafetyCertificateOutlined />,
          key: "verification-modal",
          label: text.components.verificationModal,
        },
        {
          icon: <SafetyCertificateOutlined />,
          key: "verification-drawer",
          label: text.components.verificationDrawer,
        },
        {
          icon: <LockOutlined />,
          key: "verification-provider",
          label: text.components.verificationProvider,
        },
      ],
      key: "verification",
      label: text.components.verificationGroup,
      type: "group",
    },
    {
      children: [
        {
          icon: <KeyOutlined />,
          key: "challenge-field",
          label: text.components.challengeField,
        },
      ],
      key: "challenge",
      label: text.components.challengeGroup,
      type: "group",
    },
  ];

  return (
    <WorkbenchSectionLayout
      nav={nav}
      selectedKey={activeSection(location.pathname)}
      siderWidth={232}
      onSelect={(key) => navigate(`/components/${key}`)}
    >
      <Outlet />
    </WorkbenchSectionLayout>
  );
}

function activeSection(pathname: string): ComponentSectionKey {
  const key = pathname.split("/")[2];
  return componentKeys.has(key as ComponentSectionKey)
    ? (key as ComponentSectionKey)
    : "credential-form";
}
