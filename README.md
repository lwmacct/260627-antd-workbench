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
  WorkbenchPanel,
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
    <WorkbenchProvider defaultLocale="zh-CN" localeStorageKey="my-tool.locale">
      <WorkbenchShell
        account={
            <WorkbenchUserMenu
              groups={[{
                key: "account",
                items: [{ href: "/settings", key: "settings", kind: "link", label: "设置" }],
              }]}
              user={{ displayName: "Ada Lovelace", provider: "GitHub", username: "ada" }}
            onLogout={() => console.log("logout")}
          />
        }
        utilities={
          <>
            <WorkbenchThemeToggle />
            <WorkbenchLanguageToggle />
          </>
        }
        brand={{ name: "Workbench", version: "2.0.0" }}
        nav={nav}
        selectedNavKey="dashboard"
        onSelectNav={(key) => console.log(key)}
      >
        <WorkbenchPage title="Dashboard">
          <WorkbenchPanel title="Queue">业务页面内容</WorkbenchPanel>
        </WorkbenchPage>
      </WorkbenchShell>
    </WorkbenchProvider>
  );
}
```

## 中英文

Workbench 严格支持 `zh-CN` 和 `en-US`。Provider 内置两套 Ant Design locale 和 Workbench
组件文案；语言按钮、主题按钮、账户菜单、移动端导航、外观设置及安全组件会自动随 locale
切换，消费方无需逐个传入 labels。

```tsx
<WorkbenchProvider
  defaultLocale="zh-CN"
  localeStorageKey="my-tool.locale"
  onLocaleChange={(locale) => console.log(locale)}
>
  <App />
</WorkbenchProvider>
```

首次语言按“有效持久化值、浏览器语言、`defaultLocale`”选择。非法持久化值会回退到受支持
语言并自动修正。需要受控状态时传入 `locale="en-US"` 和 `onLocaleChange`。

Workbench 只翻译公共组件。业务应用应通过 `useWorkbenchLocale()` 读取严格类型的 locale，
并据此选择自己的中英文业务词典。

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
  WorkbenchCodeVerificationModal,
  WorkbenchHumanChallengeField,
  WorkbenchOAuthSignInPage,
  WorkbenchPasswordSignInPage,
  WorkbenchPasswordSignUpPage,
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
| `WorkbenchHeaderUtilities` | 顶部栏工具按钮容器，统一尺寸、边框与间距。 |
| `WorkbenchPage` | 页面标题、描述、操作区和内容容器。 |
| `WorkbenchPanel` | 标准内容面板，基于 Ant Design `Card`，用于业务页面里的信息块、表单和表格容器。 |
| `WorkbenchSectionLayout` | 设置页或分组页面的侧边导航布局。 |
| `WorkbenchSplitWorkspace` | 通用侧栏加工作区布局。 |
| `WorkbenchAppearanceSettings` | 外观设置面板，必须在 `WorkbenchProvider` 下使用。 |
| `WorkbenchThemeToggle` | 深浅色切换按钮。 |
| `WorkbenchLanguageToggle` | locale 切换按钮。 |
| `WorkbenchUserMenu` | 固定 256px 的用户菜单，支持身份信息、分组链接、异步操作和退出登录。 |
| `WorkbenchSecurityPage` | 安全流程共用的品牌、面板和错误布局。 |
| `WorkbenchOAuthSignInPage` | OAuth 专用登录页，不绑定会话请求或路由。 |
| `WorkbenchOAuthProviderButtons` | OAuth provider 按钮组，只负责渲染和选择回调。 |
| `WorkbenchPasswordSignInForm/Page/Modal/Drawer` | 本地账号密码登录的显式表单与容器。 |
| `WorkbenchPasswordSignUpForm/Page` | 本地账号注册的显式表单与整页容器。 |
| `WorkbenchHumanChallengeField` | 图片或远程人机挑战输入控件。 |
| `WorkbenchCodeVerificationForm/Page/Modal/Drawer` | 邮件、短信、TOTP 和恢复码验证。 |
| `WorkbenchPasskeyVerificationAction` | 不渲染验证码输入框的通行密钥验证操作。 |
| `WorkbenchVerificationProvider` | 根据 `kind: "code" | "passkey"` 分流并提供 Promise 式验证编排。 |

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

公共主题变量只使用 `--wb-*` 命名空间。业务应用不应把这些 token 复制成 `--app-*`
等自定义别名；页面面板优先使用 `WorkbenchPanel` 或 Ant Design token，避免在业务 CSS
中覆盖卡片背景和边框颜色。

## 示例应用

```bash
pnpm run dev
```

示例应用位于 `example/`，通过包名导入本库，开发时由 `vite.example.config.ts` alias 到本地 `src/`。

示例首页包含 `WorkbenchVerificationProvider` 的页面内敏感操作验证；`Components` 导航使用左侧菜单拆分展示 security 表单、弹窗、抽屉、Provider 和 challenge 控件；安全路由包含整页登录、注册和二次验证流程。

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
