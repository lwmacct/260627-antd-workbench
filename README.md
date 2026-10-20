# @lwmacct/260627-antd-workbench

面向高密度运营后台的 React 19 与 Ant Design 6 workbench 基础组件库. 本仓库发布一个 npm 包; `src/` 是库源码和发布边界, `example/` 是不参与发布的消费方示例.

## Agent skills

仓库中的复杂开发流程以 Agent Skills 方式维护. 处理以下任务时, 先读取对应入口:

- Identity 页面维护, 宿主接入或共享包边界评审: [.agents/skills/workbench-identity-pages/SKILL.md](.agents/skills/workbench-identity-pages/SKILL.md)
- 在宿主 Vite 应用中临时联调未发布源码: [.agents/skills/workbench-vite-source-alias/SKILL.md](.agents/skills/workbench-vite-source-alias/SKILL.md)

技能入口会按需指向更详细的 references, 避免把所有场景一次性加载进上下文.

## 安装

```bash
pnpm add react react-dom antd @ant-design/icons
pnpm add @lwmacct/260627-antd-workbench
```

全屏 workbench 应用导入:

```tsx
import "antd/dist/reset.css";
import "@lwmacct/260627-antd-workbench/global.css";
```

只使用组件样式时导入:

```tsx
import "antd/dist/reset.css";
import "@lwmacct/260627-antd-workbench/styles.css";
```

## 快速接入

```tsx
import {
  WorkbenchAppearanceButton,
  WorkbenchLanguageToggle,
  WorkbenchPage,
  WorkbenchPanel,
  WorkbenchProvider,
  WorkbenchShell,
  type WorkbenchNavEntry,
} from "@lwmacct/260627-antd-workbench";

const nav: WorkbenchNavEntry[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "settings", label: "Settings" },
];

export function App() {
  return (
    <WorkbenchProvider defaultLocale="zh-CN" localeStorageKey="my-tool.locale">
      <WorkbenchShell
        brand={{ name: "Workbench" }}
        nav={nav}
        selectedNavKey="dashboard"
        onSelectNav={(key) => console.log(key)}
        utilities={
          <>
            <WorkbenchAppearanceButton />
            <WorkbenchLanguageToggle />
          </>
        }
      >
        <WorkbenchPage title="Dashboard">
          <WorkbenchPanel title="Queue">业务页面内容</WorkbenchPanel>
        </WorkbenchPage>
      </WorkbenchShell>
    </WorkbenchProvider>
  );
}
```

## 公开入口与边界

主入口导出稳定 API. 也可以按模块导入:

```ts
import { WorkbenchProvider } from "@lwmacct/260627-antd-workbench/provider";
import { WorkbenchIdentityProfilePage } from "@lwmacct/260627-antd-workbench/identity";
import { findNavItem } from "@lwmacct/260627-antd-workbench/navigation";
import { WorkbenchVerificationProvider } from "@lwmacct/260627-antd-workbench/security";
import { createWorkbenchPalette } from "@lwmacct/260627-antd-workbench/theme";
```

Workbench 严格支持 `zh-CN` 与 `en-US`, 但只翻译公共组件文案. 业务应用通过 `useWorkbenchLocale()` 读取 locale, 并维护自己的业务词典.

Identity 与 security 页面保持纯 UI 边界. 宿主提供数据, 配置, 导航和异步回调; 包内不包含 fetch, React Query, React Router, 短信或邮件 Provider.

`WorkbenchProvider` 会写入 `data-workbench-*` 属性与 `--wb-*` CSS 变量. 业务样式优先使用 `WorkbenchPanel`, Ant Design token 或这些公共变量, 不要复制成应用专属别名.

## 开发

```bash
pnpm install --frozen-lockfile
npm run typecheck
pnpm run build
pnpm run build:example
pnpm run dev
```

修改共享库后必须先运行 `npm run typecheck` 与 `pnpm run build`. 只有明确需要发布新版本时, 才在检查通过后运行 `task git:tag:next`.
