---
name: workbench-vite-source-alias
description: 为 Vite 宿主应用临时链接 @lwmacct/260627-antd-workbench 本地源码. 适用于发版前 resolve.alias 配置, CSS 与子路径解析, 依赖去重和 alias 清理; 不用于长期生产包配置.
---

# Workbench Vite source alias

当应用必须从自己的 Vite dev server 或生产构建测试未发布的 Workbench 源码变更时, 使用此技能. 这是临时联调技术, 不能替代发包和依赖升级.

## 指令

- 确认消费应用已经依赖已发布的 Workbench 包. 只在验证源码变更期间 alias 本地 checkout.
- 修改宿主 Vite 配置或诊断 alias 行为前, 阅读 [references/alias-setup.md](references/alias-setup.md).
- 优先为应用实际导入的每个公开入口配置精确正则 alias. 如果使用字符串 alias 对象, 把所有更具体的子路径放在包根 alias 之前.
- Workbench checkout 位于宿主项目外时, 为 `react` 与 `react-dom` 配置 `resolve.dedupe`.
- 除 dev server 检查外, 运行宿主的 typecheck, 生产构建和相关测试.
- Workbench 发布后, 升级宿主依赖, 移除所有 Workbench alias 和临时 TypeScript paths, 再确认宿主不再依赖机器专属 checkout 路径.

## 安全边界

不要提交依赖本地绝对路径的可部署生产配置. 当应用导入 CSS 或 `identity`, `security`, `theme` 等公开子路径时, 不要只 alias 包根.
