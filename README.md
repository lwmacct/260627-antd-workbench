# @lwmacct/260627-antd-workbench

面向高密度运营后台的 React + Ant Design workbench 基础组件库。

这个包提供全屏应用外壳、顶部导航、分区导航、页面容器、用户菜单、主题切换和外观预设。它只负责通用 UI 基础设施；路由、认证、数据请求、权限控制和业务页面应保留在使用方应用内。

## 设计边界

- 公共导航模型使用 `WorkbenchNavItem`，不把 Ant Design `MenuProps["items"]` 暴露给业务代码。
- JS 入口不再自动导入 CSS，避免“导入组件即修改整站样式”的副作用。
- `styles.css` 只包含组件和主题变量样式；`global.css` 额外包含全屏应用需要的 body、滚动条和 Ant Design 全局覆盖。
- 外观系统以一个标准化 `WorkbenchAppearance` 对象为核心，统一驱动 CSS 变量和 Ant Design theme tokens。
- 语言状态只处理通用 locale 值、Ant Design locale 和文档 `lang` 属性，不包含任何业务文案字典。

## 安装

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

## 样式入口

全屏 workbench 应用推荐导入：

```tsx
import "antd/dist/reset.css";
import "@lwmacct/260627-antd-workbench/global.css";
```

如果只想使用组件样式，不希望本库修改 `body`、全局滚动条或通用 Ant Design 覆盖：

```tsx
import "antd/dist/reset.css";
import "@lwmacct/260627-antd-workbench/styles.css";
```

## 快速接入

```tsx
import {
  AppShell,
  LanguageToggle,
  Page,
  ThemeToggle,
  UserMenu,
  WorkbenchRoot,
  type WorkbenchNavEntry,
} from "@lwmacct/260627-antd-workbench";

const nav: WorkbenchNavEntry[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "settings", label: "Settings" },
];

export function App() {
  const activeKey = "dashboard";

  return (
    <WorkbenchRoot
      appearance={{
        defaultValue: {
          accent: "#2388ff",
          density: "comfortable",
          mode: "dark",
          radius: 6,
          scheme: "graphite",
          surface: "deep",
        },
        storageKey: "my-app.appearance",
      }}
      locale={{
        defaultValue: "zh",
        options: [
          { value: "zh", label: "简体中文", shortLabel: "简 / EN", documentLang: "zh-CN" },
          { value: "en", label: "English", shortLabel: "EN / 简", documentLang: "en" },
        ],
        storageKey: "my-app.locale",
      }}
    >
      <AppShell
        actions={
          <>
            <ThemeToggle />
            <LanguageToggle />
            <UserMenu
              user={{ name: "Ada Lovelace", initials: "A" }}
              onLogout={() => undefined}
            />
          </>
        }
        brand={{ name: "Workbench", version: "1.0.0" }}
        nav={nav}
        selectedNavKey={activeKey}
        onSelectNav={(key) => {
          // 在这里接入业务应用自己的路由。
          console.log(key);
        }}
      >
        <Page title="Dashboard" description="Operational overview and daily work queue.">
          {/* 业务页面内容放在这里。 */}
        </Page>
      </AppShell>
    </WorkbenchRoot>
  );
}
```

## 外观系统

`WorkbenchRoot` 会保存标准化后的 `WorkbenchAppearance`，生成 Ant Design `ThemeConfig`，并把 CSS 变量写入根元素。默认写入 `document.documentElement`，也可以通过 `appearance.rootElement` 指定目标元素。

```tsx
import {
  AppearanceSettings,
  useWorkbenchAppearance,
} from "@lwmacct/260627-antd-workbench";

function SettingsPage() {
  return (
    <AppearanceSettings
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

### `WorkbenchRoot`

| Prop | 说明 |
| --- | --- |
| `appearance.defaultValue` | 外观默认值，会与库默认配置合并。 |
| `appearance.storageKey` | localStorage key。传 `false` 可关闭持久化，默认是 `workbench.appearance`。 |
| `appearance.rootElement` | 接收 `data-workbench-*` 属性和 CSS 变量的元素，默认是 `document.documentElement`。 |
| `appearance.onChange` | 外观变化后的回调。 |
| `locale.defaultValue` | locale 默认值。 |
| `locale.value` | 受控 locale 值。 |
| `locale.options` | 可选语言列表，可携带 `label`、`shortLabel`、`documentLang`、`antdLocale`。 |
| `locale.storageKey` | locale localStorage key。传 `false` 可关闭持久化，默认是 `workbench.locale`。 |
| `locale.documentLang` | 写入根元素 `lang` 的固定值或映射函数。 |
| `locale.antdLocale` | 默认 Ant Design locale；也可在每个 locale option 上提供。 |
| `locale.onChange` | locale 变化后的回调。 |
| `antd.locale` | 直接传给 Ant Design `ConfigProvider` 的 locale，优先级高于 locale option。 |
| `antd.theme` | 额外 Ant Design theme。默认与 workbench theme 浅合并。 |
| `antd.mergeTheme` | 是否合并 `antd.theme` 和 workbench theme，默认 `true`。 |
| `antd.config` | 透传给 Ant Design `ConfigProvider` 的其他配置。 |
| `antd.app` | 是否包裹 Ant Design `App`，也可传 `App` props。 |
| `withAntdApp` | 是否用 Ant Design `App` 包裹 children，默认是 `true`。 |

### Locale 与 AntD

业务应用可以继续维护自己的文案字典，只把当前 locale、Ant Design locale 和语言切换控件交给 workbench：

```tsx
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import {
  LanguageToggle,
  WorkbenchRoot,
  useWorkbenchLocale,
} from "@lwmacct/260627-antd-workbench";

const localeOptions = [
  {
    value: "zh",
    label: "简体中文",
    shortLabel: "简 / EN",
    documentLang: "zh-CN",
    antdLocale: zhCN,
  },
  {
    value: "en",
    label: "English",
    shortLabel: "EN / 简",
    documentLang: "en",
    antdLocale: enUS,
  },
];

function App() {
  return (
    <WorkbenchRoot locale={{ defaultValue: "zh", options: localeOptions }}>
      <LanguageToggle />
    </WorkbenchRoot>
  );
}
```

`useWorkbenchLocale()` 返回 `locale`、`options`、`setLocale`、`toggleLocale` 和当前解析出的 `antdLocale`。

## 导航模型

```ts
interface WorkbenchNavItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  title?: string;
  children?: WorkbenchNavItem[];
}

interface WorkbenchNavGroup {
  type: "group";
  key: string;
  label: React.ReactNode;
  children: WorkbenchNavItem[];
}
```

`AppShell`、`Header` 和 `SectionLayout` 都消费 `WorkbenchNavEntry[]`。库内部会通过 `toAntdMenuItems` 转换为 Ant Design 菜单项。

## 组件

### `AppShell`

顶层全屏布局组件。它渲染 `Header` 和一个可滚动内容区。

| Prop | 说明 |
| --- | --- |
| `brand` | 品牌信息：`name`，以及可选的 `mark`、`subtitle`、`version`、`ariaLabel`。 |
| `nav` | `WorkbenchNavEntry[]`。 |
| `selectedNavKey` / `selectedNavKeys` | 当前选中的导航 key。 |
| `onSelectNav` | 点击菜单时触发，通常接入业务路由。 |
| `actions` | 顶部栏右侧操作区，通常放主题切换、通知、用户菜单等。 |
| `flushContent` | 移除内容区默认 padding，并让内容区使用 flex 布局，适合嵌套分区布局。 |

### `Header`

独立顶部栏组件，也是 `AppShell` 内部使用的 header。只有在业务应用需要自己控制外层布局时才建议直接使用。

### `SectionLayout`

用于设置页、管理模块或分组页面的双栏布局。

```tsx
<SectionLayout
  nav={[
    { key: "profile", label: "Profile" },
    { key: "appearance", label: "Appearance" },
  ]}
  selectedKey="profile"
  onSelect={(key) => console.log(key)}
>
  <Page title="Profile">...</Page>
</SectionLayout>
```

桌面端渲染侧边菜单；小屏幕下隐藏侧边菜单，并用底部抽屉展示同一组菜单项。

### `SplitWorkspace`

用于“任意侧栏内容 + 工作区”的通用双栏布局。侧栏可以是树、筛选器、列表、统计卡片或业务自定义组件。

```tsx
<SplitWorkspace
  sidebar={<RoomList />}
  sidebarWidth={260}
  contentClassName="workspace-body"
>
  <Page title="Workspace">...</Page>
</SplitWorkspace>
```

默认在小屏幕下折叠为上下布局。传 `collapseOnMobile={false}` 可关闭这个行为。

`SplitWorkspace` 会把内容区拆成滚动视口和内容主体两层：`viewportClassName` 作用在外层滚动视口，`contentClassName` 作用在内层主体。内层主体默认按列方向撑满剩余宽度和最小高度，业务页面通常只需要给 `contentClassName` 添加间距、局部网格或自己的工作区结构。

### `Page`

页面级容器，用于统一标题、描述、操作区和内容间距。`toolbar` 和 `extra` 可用于放置按钮、筛选器或页面操作。

### `AppearanceSettings`

预设驱动的外观设置面板，必须渲染在 `WorkbenchRoot` 下。可以用 `sections` 控制展示哪些设置项，用 `labels` 替换默认文案。

### `ThemeToggle`

主题切换图标按钮，用于在已解析的深色和浅色主题之间切换。当当前模式是 `system` 时，点击后会写入明确的 `dark` 或 `light` 模式。

### `LanguageToggle`

语言切换按钮，读取 `WorkbenchRoot` 的 locale options 并切换到下一个 locale。也可以通过组件自身的 `options` prop 临时覆盖。

### `UserMenu`

头像按钮，包含用户身份展示、可选账号入口、自定义菜单项和退出登录操作。用户信息通过 `user` 注入，可传 `name`、`username`、`initials` 或自定义 `avatar`。

### `CenterState`

全高居中状态容器，适合加载中、未登录、空状态和错误状态页面。

## 工具函数

| 导出 | 说明 |
| --- | --- |
| `findNavItem(items, activeKey)` | 按 key 递归查找导航项。 |
| `getNavItemLabel(items, activeKey, fallback)` | 返回当前导航项 label，未找到时返回 fallback。 |
| `toAntdMenuItems(items)` | 把 `WorkbenchNavEntry[]` 转换为 Ant Design menu items。 |
| `createWorkbenchPalette(appearance, resolvedMode)` | 根据外观配置生成标准化调色板。 |
| `createWorkbenchTheme(appearance, palette, resolvedMode)` | 生成 Ant Design `ThemeConfig`。 |
| `createWorkbenchCssVars(palette)` | 把调色板转换为 CSS 自定义属性。 |
| `normalizeWorkbenchAppearance(value?)` | 标准化并限制外观配置的取值范围。 |
| `resolveWorkbenchThemeMode(mode, systemMode?)` | 把 `system` 解析为 `dark` 或 `light`。 |

## CSS 变量

`WorkbenchRoot` 会写入 `--app-bg`、`--app-workbench-bg`、`--app-header-bg`、`--app-sidebar-bg`、`--app-card-bg`、`--app-border`、`--app-text`、`--app-accent`、`--app-control-radius` 等变量。业务组件可以直接使用这些变量，与 workbench 主题保持一致。

根元素还会获得以下属性：

| 属性 | 示例 |
| --- | --- |
| `data-workbench-mode` | `dark`、`light` 或 `system` |
| `data-workbench-theme` | 解析后的 `dark` 或 `light` |
| `data-workbench-density` | `compact`、`comfortable` 或 `spacious` |
| `data-workbench-locale` | 当前 locale 值 |

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
