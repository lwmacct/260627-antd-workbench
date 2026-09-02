import { BellOutlined, KeyOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import {
  WorkbenchSectionLayout,
  type WorkbenchNavEntry,
} from "@lwmacct/260627-antd-workbench";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useExampleText } from "../../../shared/i18n";

type SettingsSectionKey = "notifications" | "password" | "profile" | "sessions";

const settingsSectionKeys = ["profile", "password", "sessions", "notifications"] as const;

const settingsKeys = new Set<SettingsSectionKey>(
  settingsSectionKeys,
);

export function SettingsLayout() {
  const text = useExampleText();
  const location = useLocation();
  const navigate = useNavigate();
  const settingsNav: WorkbenchNavEntry[] = [
    {
      children: [
        { icon: <UserOutlined />, key: "profile", label: text.settings.profile },
        { icon: <KeyOutlined />, key: "password", label: text.settings.password },
        { icon: <LoginOutlined />, key: "sessions", label: text.settings.sessions },
        { icon: <BellOutlined />, key: "notifications", label: text.settings.notifications },
      ],
      key: "settings",
      label: text.settings.group,
      type: "group",
    },
  ];

  return (
    <WorkbenchSectionLayout
      nav={settingsNav}
      selectedKey={activeSection(location.pathname)}
      onSelect={(key) => navigate(`/settings/${key}`)}
    >
      <Outlet />
    </WorkbenchSectionLayout>
  );
}

function activeSection(pathname: string): SettingsSectionKey {
  const key = pathname.split("/")[2];
  return settingsKeys.has(key as SettingsSectionKey)
    ? (key as SettingsSectionKey)
    : "profile";
}
