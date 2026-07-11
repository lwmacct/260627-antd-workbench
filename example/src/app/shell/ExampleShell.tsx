import {
  AppstoreOutlined,
  BlockOutlined,
  ExperimentOutlined,
  GithubOutlined,
  LoginOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  WorkbenchLanguageToggle,
  WorkbenchShell,
  WorkbenchThemeToggle,
  WorkbenchUserMenu,
  type WorkbenchShellProps,
} from "@lwmacct/260627-antd-workbench";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useExampleText } from "../../shared/i18n";
import { examplePaths, topNavFromPathname, type TopNavKey } from "../router/navigation";

type ShellNav = WorkbenchShellProps["nav"];

const navTargets: Record<TopNavKey, string> = {
  dashboard: examplePaths.dashboard,
  components: examplePaths.components,
  security: examplePaths.security,
  settings: examplePaths.settings,
  workspace: examplePaths.workspace,
};

export function ExampleShell() {
  const text = useExampleText();
  const location = useLocation();
  const navigate = useNavigate();
  const activeNavKey = topNavFromPathname(location.pathname);
  const flushContent =
    activeNavKey === "components" || activeNavKey === "settings" || activeNavKey === "workspace";
  const topNav: ShellNav = [
    { icon: <AppstoreOutlined />, key: "dashboard", label: text.shell.dashboard },
    { icon: <BlockOutlined />, key: "components", label: text.shell.components },
    { icon: <ExperimentOutlined />, key: "workspace", label: text.shell.workspace },
    { icon: <SettingOutlined />, key: "settings", label: text.shell.settings },
    { icon: <LoginOutlined />, key: "security", label: text.shell.security },
  ];

  function handleSelectNav(key: string) {
    const target = navTargets[key as TopNavKey];
    if (target && target !== location.pathname) {
      navigate(target);
    }
  }

  return (
    <WorkbenchShell
      actions={
        <>
          <WorkbenchThemeToggle />
          <WorkbenchLanguageToggle />
          <WorkbenchUserMenu
            actions={[
              {
                icon: <GithubOutlined />,
                key: "source",
                label: text.shell.source,
              },
            ]}
            user={{
              displayName: "Ada Lovelace",
              provider: "GitHub",
              providerIcon: <GithubOutlined />,
              username: "ada-lovelace",
            }}
            onLogout={() => undefined}
          />
        </>
      }
      brand={{ name: "Workbench", version: "2.0.0" }}
      flushContent={flushContent}
      nav={topNav}
      selectedNavKey={activeNavKey}
      onSelectNav={handleSelectNav}
    >
      <Outlet />
    </WorkbenchShell>
  );
}
