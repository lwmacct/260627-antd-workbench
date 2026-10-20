# Vite alias setup

## 推荐的精确 alias

把 `workbenchDir` 设置为当前 Workbench checkout 的真实绝对路径, 并为宿主实际导入的每个公开入口建立映射:

```ts
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const workbenchDir = "/absolute/path/to/260627-antd-workbench";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@lwmacct\/260627-antd-workbench\/global\.css$/,
        replacement: path.resolve(workbenchDir, "src/styles/global.css"),
      },
      {
        find: /^@lwmacct\/260627-antd-workbench\/styles\.css$/,
        replacement: path.resolve(workbenchDir, "src/styles/index.css"),
      },
      {
        find: /^@lwmacct\/260627-antd-workbench\/identity$/,
        replacement: path.resolve(workbenchDir, "src/identity.ts"),
      },
      {
        find: /^@lwmacct\/260627-antd-workbench\/navigation$/,
        replacement: path.resolve(workbenchDir, "src/navigation.ts"),
      },
      {
        find: /^@lwmacct\/260627-antd-workbench\/provider$/,
        replacement: path.resolve(workbenchDir, "src/provider.ts"),
      },
      {
        find: /^@lwmacct\/260627-antd-workbench\/security$/,
        replacement: path.resolve(workbenchDir, "src/security.ts"),
      },
      {
        find: /^@lwmacct\/260627-antd-workbench\/theme$/,
        replacement: path.resolve(workbenchDir, "src/theme.ts"),
      },
      {
        find: /^@lwmacct\/260627-antd-workbench$/,
        replacement: path.resolve(workbenchDir, "src/index.ts"),
      },
    ],
    dedupe: ["react", "react-dom"],
  },
});
```

删除宿主没有导入的入口映射, 但不要删除它实际导入的入口映射.

## 源码映射

| Public import | Local source |
| --- | --- |
| `@lwmacct/260627-antd-workbench` | `src/index.ts` |
| `@lwmacct/260627-antd-workbench/global.css` | `src/styles/global.css` |
| `@lwmacct/260627-antd-workbench/styles.css` | `src/styles/index.css` |
| `@lwmacct/260627-antd-workbench/identity` | `src/identity.ts` |
| `@lwmacct/260627-antd-workbench/navigation` | `src/navigation.ts` |
| `@lwmacct/260627-antd-workbench/provider` | `src/provider.ts` |
| `@lwmacct/260627-antd-workbench/security` | `src/security.ts` |
| `@lwmacct/260627-antd-workbench/theme` | `src/theme.ts` |

## 字符串 alias 对象

如果宿主已经使用字符串 alias 对象, Vite 可能把包根字符串当作前缀匹配. 例如, 只把包根映射到 `src/index.ts` 时, `.../styles.css` 可能被解析成无效路径 `src/index.ts/styles.css`.

必须把每个精确公开子路径放在包根之前:

```ts
resolve: {
  alias: {
    "@lwmacct/260627-antd-workbench/global.css":
      path.resolve(workbenchDir, "src/styles/global.css"),
    "@lwmacct/260627-antd-workbench/styles.css":
      path.resolve(workbenchDir, "src/styles/index.css"),
    "@lwmacct/260627-antd-workbench":
      path.resolve(workbenchDir, "src/index.ts"),
  },
  dedupe: ["react", "react-dom"],
}
```

## TypeScript 解析

Vite alias 不会自动改变独立 `tsc` 调用的包类型解析.

- 如果本地源码 API 与已安装发布版本兼容, 让 TypeScript 继续使用发布包声明文件
- 如果源码 API 不同, 在宿主 `tsconfig.json` 中临时配置 `baseUrl` 与匹配的 `paths`, 并把包根和每个变化的公开子路径映射到源码文件
- 清理时移除临时 `paths`, 除非宿主有意维护仓库内源码链接

## 验证

在消费应用中, 运行原有 Vite dev server 冒烟检查, typecheck, 生产构建和测试. 修改 Vite 配置后重启服务. 修改一个 Workbench 源码文件, 并确认宿主通过 hot module replacement 收到变化.

在 Workbench checkout 中, 运行 `npm run typecheck` 和 `pnpm run build`. 内置 example 也变化时, 运行 `pnpm run build:example`.

## 问题排查

- CSS 解析成 `src/index.ts/styles.css`: 缺少精确 CSS alias, 或字符串包根 alias 被先匹配
- 修改源码后没有 hot update: 确认 alias 指向 `src/` 而不是 `dist/`, 重启 Vite, 并检查 `workbenchDir` 是否存在
- Invalid hook call 或 Context 丢失: 保留 `react` 与 `react-dom` 的 `resolve.dedupe`, 并让 React 继续作为 Workbench peer dependency
- Runtime 使用本地源码但类型仍是旧 API: 配置临时 TypeScript `paths`, 或升级发布包让声明文件匹配
- 清理后仍残留机器专属路径: 包升级后移除 Workbench alias 与 TypeScript `paths`, 再在宿主配置中搜索 checkout 路径
