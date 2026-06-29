# @lwmacct/260627-antd-workbench

面向高密度运营后台的 React + Ant Design workbench 基础组件库。

这个包提供全屏应用外壳、顶部导航、分区导航、页面间距、用户菜单、主题切换和外观预设，适合内部工具、管理后台和运营控制台。它只负责通用 UI 基础设施；路由、认证、数据请求、权限控制和业务页面应保留在使用方应用内。

## 能力概览

- 全屏 workbench 外壳，包含固定顶部栏和可滚动内容区。
- 顶部导航在桌面端使用 Ant Design `Menu`，在移动端自动切换为下拉菜单。
- 分区布局在桌面端使用侧边导航，在移动端自动切换为底部抽屉导航。
- 基于一个标准化外观对象生成 Ant Design 6 主题配置。
- 支持深色、浅色、跟随系统三种主题模式，并可本地持久化。
- 内置配色方案、底色层级、主色、密度和圆角设置。
- 提供菜单查找和 className 拼接等小型通用工具。

## 环境要求

在业务应用中安装 peer dependencies 和本库：

```bash
npm install react react-dom antd @ant-design/icons
npm install @lwmacct/260627-antd-workbench
```

peer dependency 版本范围：

| 包 | 版本范围 |
| --- | --- |
| `react` | `^19.0.0` |
| `react-dom` | `^19.0.0` |
| `antd` | `^6.0.0` |
| `@ant-design/icons` | `^6.0.0` |

## 快速接入

在应用入口导入 Ant Design reset 样式和 workbench 样式：

```tsx
import "antd/dist/reset.css";
import "@lwmacct/260627-antd-workbench/styles.css";
```

使用 `WorkbenchProvider` 包裹应用，然后组合 workbench 基础组件：

```tsx
import {
  WorkbenchPage,
  WorkbenchProvider,
  WorkbenchShell,
  WorkbenchThemeToggle,
  WorkbenchUserMenu,
} from "@lwmacct/260627-antd-workbench";
import type { MenuProps } from "antd";

const navItems: MenuProps["items"] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "settings", label: "Settings" },
];

export function App() {
  const activeKey = "dashboard";

  return (
    <WorkbenchProvider
      defaultAppearance={{
        accent: "#2388ff",
        density: "comfortable",
        mode: "dark",
        radius: 6,
        scheme: "graphite",
        surface: "deep",
      }}
      storageKey="my-app.appearance"
      withAntdApp
    >
      <WorkbenchShell
        activeNavKey={activeKey}
        actions={
          <>
            <WorkbenchThemeToggle />
            <WorkbenchUserMenu username="Ada" onLogout={() => undefined} />
          </>
        }
        brand={{ name: "Workbench", version: "1.0.0" }}
        navItems={navItems}
        onNavigate={(key) => {
          // 在这里接入业务应用自己的路由。
          console.log(key);
        }}
      >
        <WorkbenchPage
          title="Dashboard"
          description="Operational overview and daily work queue."
        >
          {/* 业务页面内容放在这里。 */}
        </WorkbenchPage>
      </WorkbenchShell>
    </WorkbenchProvider>
  );
}
```

本库样式默认服务于全屏应用：`body` 不滚动，由 `WorkbenchShell` 和内部布局内容区负责滚动。如果要在非全屏页面或嵌入式部件中使用，建议按需使用底层组件，并在业务应用中覆盖布局样式。

## 外观系统

`WorkbenchProvider` 保存标准化后的 `WorkbenchAppearance` 对象，生成 Ant Design theme tokens，把 CSS 变量写入根元素，并通过 `useWorkbenchAppearance` 暴露状态和更新方法。

```tsx
import {
  WorkbenchAppearanceSettings,
  useWorkbenchAppearance,
} from "@lwmacct/260627-antd-workbench";

function SettingsPage() {
  return (
    <WorkbenchAppearanceSettings
      sections={["mode", "scheme", "surface", "accent", "density", "radius", "preview"]}
    />
  );
}

function ThemeButton() {
  const { appearance, resolvedMode, toggleThemeMode } = useWorkbenchAppearance();

  return (
    <button onClick={toggleThemeMode}>
      {resolvedMode} / {appearance.density}
    </button>
  );
}
```

### 外观字段

| 字段 | 可选值 |
| --- | --- |
| `mode` | `dark`, `light`, `system` |
| `density` | `compact`, `comfortable`, `spacious` |
| `scheme` | `carbon`, `graphite`, `midnight`, `mist`, `neutral`, `paper`, `porcelain`, `warm`, `zinc` |
| `surface` | `black`, `deep`, `soft`, `tinted` |
| `accent` | 任意合法 hex 颜色，非法值会回退到默认主色 |
| `radius` | `0` 到 `12` 的整数 |

### Provider Props

| Prop | 说明 |
| --- | --- |
| `defaultAppearance` | 外观默认值，会与库默认配置合并。 |
| `storageKey` | localStorage key。传 `false` 可关闭持久化，默认是 `workbench.appearance`。 |
| `rootElement` | 接收 `data-workbench-*` 属性和 CSS 变量的元素，默认是 `document.documentElement`。 |
| `withAntdApp` | 是否用 Ant Design `App` 包裹 children，默认是 `true`。 |
| `onAppearanceChange` | 外观变化后的回调。 |

## 组件

### `WorkbenchShell`

顶层全屏布局组件。它会渲染 `WorkbenchHeader` 和一个可滚动内容区。

常用 props：

| Prop | 说明 |
| --- | --- |
| `brand` | 品牌信息：`name`，以及可选的 `mark`、`subtitle`、`version`、`ariaLabel`。 |
| `navItems` | Ant Design `MenuProps["items"]`。 |
| `activeNavKey` / `activeNavKeys` | 当前选中的导航 key。 |
| `onNavigate` | 点击菜单时触发，参数是被点击的 menu key，通常接入业务路由。 |
| `actions` | 顶部栏右侧操作区，通常放主题切换、通知、用户菜单等。 |
| `flushContent` | 移除内容区默认 padding，并让内容区使用 flex 布局，适合嵌套分区布局。 |

### `WorkbenchHeader`

独立顶部栏组件，也是 `WorkbenchShell` 内部使用的 header。只有在业务应用需要自己控制外层布局时才建议直接使用。

### `WorkbenchSectionLayout`

用于设置页、管理模块或分组页面的双栏布局。

```tsx
<WorkbenchSectionLayout
  activeKey="profile"
  menuItems={[
    { key: "profile", label: "Profile" },
    { key: "appearance", label: "Appearance" },
  ]}
  onChange={(key) => console.log(key)}
>
  <WorkbenchPage title="Profile">...</WorkbenchPage>
</WorkbenchSectionLayout>
```

桌面端会渲染侧边菜单；小屏幕下会隐藏侧边菜单，并用底部抽屉展示同一组菜单项。

### `WorkbenchPage`

页面级容器，用于统一标题、描述、操作区和内容间距。`toolbar` 和 `extra` 可用于放置按钮、筛选器或页面操作。

### `WorkbenchAppearanceSettings`

预设驱动的外观设置面板，必须渲染在 `WorkbenchProvider` 下。可以用 `sections` 控制展示哪些设置项，用 `labels` 替换默认文案。

### `WorkbenchThemeToggle`

主题切换图标按钮，用于在已解析的深色和浅色主题之间切换。当当前模式是 `system` 时，点击后会写入明确的 `dark` 或 `light` 模式。

### `WorkbenchUserMenu`

头像按钮，包含用户身份展示、可选账号设置入口和退出登录操作。

### `WorkbenchCenterState`

全高居中状态容器，适合加载中、未登录、空状态和错误状态页面。

## 工具函数

| 导出 | 说明 |
| --- | --- |
| `cx(...values)` | 拼接 truthy className；没有结果时返回 `undefined`。 |
| `findMenuItem(items, activeKey)` | 按 key 递归查找菜单项。 |
| `getMenuItemLabel(items, activeKey, fallback)` | 返回当前菜单项 label，未找到时返回 fallback。 |
| `createWorkbenchPalette(appearance, resolvedMode?)` | 根据外观配置生成标准化调色板。 |
| `createWorkbenchTheme(appearance, palette?, resolvedMode?)` | 生成 Ant Design `ThemeConfig`。 |
| `createWorkbenchCssVars(palette)` | 把调色板转换为 CSS 自定义属性。 |
| `normalizeWorkbenchAppearance(value?)` | 标准化并限制外观配置的取值范围。 |
| `resolveWorkbenchThemeMode(mode, systemMode?)` | 把 `system` 解析为 `dark` 或 `light`。 |

## CSS 变量

`WorkbenchProvider` 会写入 `--app-bg`、`--app-workbench-bg`、`--app-header-bg`、`--app-sidebar-bg`、`--app-card-bg`、`--app-border`、`--app-text`、`--app-accent`、`--app-control-radius` 等变量。业务组件可以直接使用这些变量，与 workbench 主题保持一致。

根元素还会获得以下属性：

| 属性 | 示例 |
| --- | --- |
| `data-workbench-mode` | `dark`、`light` 或 `system` |
| `data-workbench-theme` | 解析后的 `dark` 或 `light` |
| `data-workbench-density` | `compact`、`comfortable` 或 `spacious` |

## 开发

```bash
npm ci
npm run typecheck
npm run build
```

这是一个共享库。新增 API 应尽量保持通用，避免把单一业务项目的特化逻辑写入本包。

发版前运行：

```bash
npm run typecheck
npm run build
task git:tag:next
```

推送版本标签后会触发 GitHub Actions 发布流程。
