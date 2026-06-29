import { BellOutlined, BgColorsOutlined, UserOutlined } from "@ant-design/icons";
import {
  WorkbenchSectionLayout,
  type WorkbenchNavEntry,
} from "@lwmacct/260627-antd-workbench";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useExampleText } from "../../../shared/i18n";

type SettingsSectionKey = "appearance" | "notifications" | "profile";

const settingsSectionKeys = ["appearance", "profile", "notifications"] as const;

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
        { icon: <BgColorsOutlined />, key: "appearance", label: text.settings.appearance },
        { icon: <UserOutlined />, key: "profile", label: text.settings.profile },
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
    : "appearance";
}
