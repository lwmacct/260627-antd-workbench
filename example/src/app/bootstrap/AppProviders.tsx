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
      defaultLocale="zh-CN"
      localeStorageKey="workbench.example.locale"
    >
      {children}
    </WorkbenchProvider>
  );
}
