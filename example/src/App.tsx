import { GithubOutlined } from "@ant-design/icons";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import { useState } from "react";
import {
  WorkbenchLanguageToggle,
  WorkbenchProvider,
  WorkbenchShell,
  WorkbenchThemeToggle,
  WorkbenchUserMenu,
} from "@lwmacct/260627-antd-workbench";
import { mainNav, type ExamplePageKey } from "./fixtures/nav";
import { AuthPreviewPage } from "./pages/AuthPreviewPage";
import { DashboardPage } from "./pages/DashboardPage";
import { SettingsPage } from "./pages/SettingsPage";
import { WorkspacePage } from "./pages/WorkspacePage";

export function App() {
  const [activePage, setActivePage] = useState<ExamplePageKey>("dashboard");

  return (
    <WorkbenchProvider
      appearance={{
        defaultValue: {
          accent: "#2388ff",
          density: "comfortable",
          mode: "dark",
          radius: 6,
          scheme: "graphite",
          surface: "deep",
        },
        storageKey: "workbench.example.appearance",
      }}
      locale={{
        defaultValue: "zh",
        options: [
          {
            antdLocale: zhCN,
            documentLang: "zh-CN",
            label: "简体中文",
            shortLabel: "简 / EN",
            value: "zh",
          },
          {
            antdLocale: enUS,
            documentLang: "en",
            label: "English",
            shortLabel: "EN / 简",
            value: "en",
          },
        ],
        storageKey: "workbench.example.locale",
      }}
    >
      {activePage === "auth" ? (
        <AuthPreviewPage />
      ) : (
        <WorkbenchShell
          actions={
            <>
              <WorkbenchThemeToggle />
              <WorkbenchLanguageToggle />
              <WorkbenchUserMenu
                items={[
                  {
                    icon: <GithubOutlined />,
                    key: "source",
                    label: "Source",
                  },
                ]}
                user={{ initials: "A", name: "Ada Lovelace", username: "ada@example.test" }}
              />
            </>
          }
          brand={{ name: "Workbench", version: "2.0.0" }}
          flushContent={activePage === "settings" || activePage === "workspace"}
          nav={mainNav}
          selectedNavKey={activePage}
          onSelectNav={(key) => setActivePage(key as ExamplePageKey)}
        >
          {activePage === "dashboard" ? <DashboardPage /> : null}
          {activePage === "workspace" ? <WorkspacePage /> : null}
          {activePage === "settings" ? <SettingsPage /> : null}
        </WorkbenchShell>
      )}
    </WorkbenchProvider>
  );
}
