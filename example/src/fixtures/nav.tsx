import {
  AppstoreOutlined,
  ExperimentOutlined,
  LoginOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { WorkbenchNavEntry } from "@lwmacct/260627-antd-workbench";

export type ExamplePageKey = "auth" | "dashboard" | "settings" | "workspace";

export const mainNav: WorkbenchNavEntry[] = [
  { icon: <AppstoreOutlined />, key: "dashboard", label: "总览" },
  { icon: <ExperimentOutlined />, key: "workspace", label: "工作区" },
  { icon: <SettingOutlined />, key: "settings", label: "设置" },
  { icon: <LoginOutlined />, key: "auth", label: "认证" },
];
