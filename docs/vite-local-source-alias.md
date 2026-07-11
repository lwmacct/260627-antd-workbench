# 使用 Vite `resolve.alias` 联调本地包源码

当应用需要验证 Workbench 尚未发布的改动时，可以在应用的 `vite.config.ts` 中把 npm 包入口临时指向本地源码。这样无需反复打包、发布和升级版本，修改 Workbench 源码后，应用的 Vite 开发服务器即可热更新。

## 适用场景

- 同时开发应用和 Workbench，并希望立即验证 UI 改动。
- 发布前需要在真实应用中测试新的组件 API 或样式。
- 应用仍保留已发布的包依赖，希望随时可以移除 alias 回到正式版本。

这是一种本地联调技巧，不应作为生产构建的长期依赖。应用最终仍应升级到已发布版本，并删除这些 alias。

## 基础配置

假设应用源码位于任意目录，Workbench 工作区位于：

```text
/data/project/260627-antd-workbench/workspace
```

在应用的 `vite.config.ts` 中配置：

```ts
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const rootDir = import.meta.dirname;
const workbenchDir = "/data/project/260627-antd-workbench/workspace";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),

      // 精确子路径必须放在包根入口之前。
      "@lwmacct/260627-antd-workbench/global.css": path.resolve(
        workbenchDir,
        "src/styles/global.css",
      ),
      "@lwmacct/260627-antd-workbench/styles.css": path.resolve(
        workbenchDir,
        "src/styles/index.css",
      ),
      "@lwmacct/260627-antd-workbench": path.resolve(
        workbenchDir,
        "src/index.ts",
      ),
    },
    dedupe: ["react", "react-dom"],
  },
});
```

应用原有的 import 不需要修改：

```ts
import {
  WorkbenchShell,
  WorkbenchUserMenu,
} from "@lwmacct/260627-antd-workbench";
import "@lwmacct/260627-antd-workbench/global.css";
import "@lwmacct/260627-antd-workbench/styles.css";
```

## 为什么要分别映射 CSS

Vite 的字符串 alias 不只处理完全相等的包名，也可能匹配包名后的子路径。如果只配置包根入口：

```ts
"@lwmacct/260627-antd-workbench": "/path/to/workbench/src/index.ts"
```

那么 `@lwmacct/260627-antd-workbench/styles.css` 可能被替换成类似以下无效路径：

```text
/path/to/workbench/src/index.ts/styles.css
```

因此需要遵守两条规则：

1. 每个实际使用的公开子路径都映射到对应源码文件。
2. 更具体的子路径 alias 写在包根 alias 前面。

如果应用使用了其他入口，例如 `@lwmacct/260627-antd-workbench/security`，也需要增加精确映射：

```ts
"@lwmacct/260627-antd-workbench/security": path.resolve(
  workbenchDir,
  "src/security.ts",
),
```

并同样放在包根 alias 之前。

## 为什么建议配置 `dedupe`

本地源码位于应用目录之外，其裸模块 import 可能从 Workbench 自己的 `node_modules` 解析。若应用与 Workbench 分别加载一份 React，可能出现 Hook 调用错误、Context 不共享或运行时行为异常。

```ts
dedupe: ["react", "react-dom"];
```

会要求 Vite 对这些依赖使用同一份实例。应用和 Workbench 的 React、Ant Design 等版本仍应保持兼容。

## 验证 alias 是否生效

1. 启动应用原有的 Vite 开发服务器。
2. 修改 Workbench 对应的 `src` 文件。
3. 确认应用发生热更新，并能看到修改结果。
4. 在应用中执行类型检查和生产构建，避免只验证开发模式。
5. 在 Workbench 中执行自身检查：

```bash
pnpm run typecheck
pnpm run build
```

若修改涉及示例应用，再执行：

```bash
pnpm run build:example
```

## 常见问题

### CSS 找不到或被解析到 `index.ts/styles.css`

原因通常是包根 alias 抢先匹配。为 CSS 增加精确 alias，并将其放到包根 alias 之前。

### 修改源码后没有热更新

- 确认 alias 指向 `src`，而不是 `dist`。
- 重启 Vite；修改 `vite.config.ts` 后不应依赖旧进程继续运行。
- 检查本地绝对路径是否真实存在。

### 出现 Invalid hook call

优先确认应用与 Workbench 的 React 版本兼容，并配置 `resolve.dedupe`。还应避免在 Workbench 中把 React 从 peer dependency 改成运行时 dependency。

### TypeScript 仍使用旧类型

Vite alias 负责运行时模块解析，不保证应用独立执行 `tsc` 时采用相同映射。如果应用的 TypeScript 配置不经过 Vite，需在应用的 `tsconfig.json` 中增加对应 `paths`，或继续让类型检查使用已发布包的声明文件。后者只适合本地源码 API 与已发布版本兼容的情况。

## 联调结束后的清理

Workbench 发布新版本后：

1. 升级应用中的 `@lwmacct/260627-antd-workbench` 依赖。
2. 删除 Workbench 相关的本地 alias；应用自身的 `@` alias 可以保留。
3. 重新安装依赖并运行类型检查、生产构建和应用测试。
4. 确认构建不再依赖 `/data/project/...` 这类开发机绝对路径。

不要提交一个准备部署到其他机器、但仍依赖本机绝对路径的生产配置。
