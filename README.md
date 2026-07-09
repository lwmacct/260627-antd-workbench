# @lwmacct/260627-antd-workbench

面向高密度运营后台的 React + Ant Design workbench 基础组件库。

本仓库仍然只发布一个 npm 包。`src/` 是库源码和发布边界，`example/` 是可运行的消费方示例应用，不参与 npm 发布。

## 安装

```bash
pnpm add react react-dom antd @ant-design/icons
pnpm add @lwmacct/260627-antd-workbench
```

## 样式入口

全屏 workbench 应用推荐导入：

```tsx
import "antd/dist/reset.css";
import "@lwmacct/260627-antd-workbench/global.css";
```

只使用组件样式时导入：

```tsx
import "antd/dist/reset.css";
import "@lwmacct/260627-antd-workbench/styles.css";
```

## 快速接入

```tsx
import {
  WorkbenchLanguageToggle,
  WorkbenchPage,
  WorkbenchProvider,
  WorkbenchShell,
  WorkbenchThemeToggle,
  WorkbenchUserMenu,
  type WorkbenchNavEntry,
} from "@lwmacct/260627-antd-workbench";

const nav: WorkbenchNavEntry[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "settings", label: "Settings" },
];

export function App() {
  return (
    <WorkbenchProvider>
      <WorkbenchShell
        actions={
          <>
            <WorkbenchThemeToggle />
            <WorkbenchLanguageToggle />
            <WorkbenchUserMenu user={{ name: "Ada Lovelace", initials: "A" }} />
          </>
        }
        brand={{ name: "Workbench", version: "2.0.0" }}
        nav={nav}
        selectedNavKey="dashboard"
        onSelectNav={(key) => console.log(key)}
      >
        <WorkbenchPage title="Dashboard">业务页面内容</WorkbenchPage>
      </WorkbenchShell>
    </WorkbenchProvider>
  );
}
```

## 公开入口

主入口导出所有稳定 API：

```ts
import { WorkbenchProvider, WorkbenchShell } from "@lwmacct/260627-antd-workbench";
```

也可以按模块导入：

```ts
import { WorkbenchProvider } from "@lwmacct/260627-antd-workbench/provider";
import { createWorkbenchPalette } from "@lwmacct/260627-antd-workbench/theme";
import { findNavItem } from "@lwmacct/260627-antd-workbench/navigation";
import {
  WorkbenchChallengeField,
  WorkbenchCredentialModal,
  WorkbenchCredentialPage,
  WorkbenchOAuthButtons,
  WorkbenchVerificationModal,
  WorkbenchVerificationPage,
  WorkbenchVerificationProvider,
  useWorkbenchVerification,
} from "@lwmacct/260627-antd-workbench/security";
```

## 目录结构

```text
src/
  components/
    account/
    controls/
    layout/
    security/
    settings/
    shell/
  appearance/
  locale/
  navigation/
  provider/
  shared/
  styles/
  theme/
example/
  src/
```

## 核心组件

| 导出 | 说明 |
| --- | --- |
| `WorkbenchProvider` | 组合 appearance、locale、Ant Design `ConfigProvider`、CSS 变量和持久化。 |
| `WorkbenchShell` | 全屏应用外壳，包含顶部栏和可滚动内容区。 |
| `WorkbenchHeader` | 独立顶部栏组件，通常由 `WorkbenchShell` 内部使用。 |
| `WorkbenchPage` | 页面标题、描述、操作区和内容容器。 |
| `WorkbenchSectionLayout` | 设置页或分组页面的侧边导航布局。 |
| `WorkbenchSplitWorkspace` | 通用侧栏加工作区布局。 |
| `WorkbenchAppearanceSettings` | 外观设置面板，必须在 `WorkbenchProvider` 下使用。 |
| `WorkbenchThemeToggle` | 深浅色切换按钮。 |
| `WorkbenchLanguageToggle` | locale 切换按钮。 |
| `WorkbenchUserMenu` | 用户头像菜单。 |
| `WorkbenchCredentialForm` | 登录/注册纯表单，不绑定页面、弹窗或路由。 |
| `WorkbenchCredentialPage` | 全屏登录/注册页。 |
| `WorkbenchCredentialModal` | 弹窗登录/注册容器。 |
| `WorkbenchCredentialDrawer` | 抽屉登录/注册容器。 |
| `WorkbenchVerificationForm` | 通用安全验证纯表单，不绑定页面、弹窗或路由。 |
| `WorkbenchVerificationPage` | 全屏安全验证页，可用于登录 2FA 路由。 |
| `WorkbenchVerificationModal` | 弹窗安全验证容器，适合任意页面内触发。 |
| `WorkbenchVerificationDrawer` | 抽屉安全验证容器，适合侧边工作流。 |
| `WorkbenchVerificationProvider` | Promise 式安全验证编排容器，配合 `useWorkbenchVerification` 使用。 |
| `WorkbenchOAuthButtons` | OAuth provider 按钮组，只负责渲染和选择回调。 |
| `WorkbenchChallengeField` | 图片验证码和远程 challenge 的通用输入控件。 |

## 主题变量

`WorkbenchProvider` 会向根元素写入 `data-workbench-*` 属性和 `--wb-*` CSS 变量，例如：

- `--wb-bg`
- `--wb-workbench-bg`
- `--wb-header-bg`
- `--wb-sidebar-bg`
- `--wb-card-bg`
- `--wb-border`
- `--wb-text`
- `--wb-accent`
- `--wb-control-radius`

## 示例应用

```bash
pnpm run dev
```

示例应用位于 `example/`，通过包名导入本库，开发时由 `vite.example.config.ts` alias 到本地 `src/`。

示例首页包含 `WorkbenchVerificationProvider` 的页面内敏感操作验证；安全路由包含整页登录、注册和二次验证流程。

## 开发

```bash
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run build
pnpm run build:example
```

发版前运行：

```bash
pnpm run typecheck
pnpm run build
task git:tag:next
```

新增能力优先保持通用 API，避免把单一业务项目的特化逻辑写入本包。
