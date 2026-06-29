import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import type { ReactNode } from "react";
import { WorkbenchProvider } from "@lwmacct/260627-antd-workbench";

export function AppProviders({ children }: { children: ReactNode }) {
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
      {children}
    </WorkbenchProvider>
  );
}
