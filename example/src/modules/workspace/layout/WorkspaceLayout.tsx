import {
  ApiOutlined,
  BarChartOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import {
  WorkbenchSectionLayout,
  type WorkbenchNavEntry,
} from "@lwmacct/260627-antd-workbench";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useExampleText } from "../../../shared/i18n";

type WorkspaceSectionKey = "capacity" | "events" | "services";

const workspaceSectionKeys = ["services", "events", "capacity"] as const;

const workspaceKeys = new Set<WorkspaceSectionKey>(
  workspaceSectionKeys,
);

export function WorkspaceLayout() {
  const text = useExampleText();
  const location = useLocation();
  const navigate = useNavigate();
  const workspaceNav: WorkbenchNavEntry[] = [
    {
      children: [
        { icon: <DatabaseOutlined />, key: "services", label: text.workspace.services },
        { icon: <ApiOutlined />, key: "events", label: text.workspace.events },
        { icon: <BarChartOutlined />, key: "capacity", label: text.workspace.capacity },
      ],
      key: "workspace",
      label: text.workspace.group,
      type: "group",
    },
  ];

  return (
    <WorkbenchSectionLayout
      nav={workspaceNav}
      selectedKey={activeSection(location.pathname)}
      onSelect={(key) => navigate(`/workspace/${key}`)}
    >
      <Outlet />
    </WorkbenchSectionLayout>
  );
}

function activeSection(pathname: string): WorkspaceSectionKey {
  const key = pathname.split("/")[2];
  return workspaceKeys.has(key as WorkspaceSectionKey)
    ? (key as WorkspaceSectionKey)
    : "services";
}
