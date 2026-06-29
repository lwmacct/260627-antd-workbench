import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Switch } from "antd";
import {
  WorkbenchAppearanceSettings,
  WorkbenchPage,
  WorkbenchSectionLayout,
  type WorkbenchNavEntry,
} from "@lwmacct/260627-antd-workbench";

const settingsNav: WorkbenchNavEntry[] = [
  { icon: <UserOutlined />, key: "profile", label: "账号" },
  { icon: <BellOutlined />, key: "notifications", label: "通知" },
  { key: "appearance", label: "外观" },
];

export function SettingsPage() {
  return (
    <WorkbenchSectionLayout nav={settingsNav} selectedKey="appearance" onSelect={() => undefined}>
      <WorkbenchPage description="库内置外观面板由使用方按需放置。" title="设置">
        <Card className="example-panel" title="外观">
          <WorkbenchAppearanceSettings />
        </Card>
        <Card className="example-panel" title="通知">
          <Switch defaultChecked /> 运行告警
        </Card>
      </WorkbenchPage>
    </WorkbenchSectionLayout>
  );
}
