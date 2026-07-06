# Agent 规则

## 发版

- 该库被多个项目复用；新增能力优先保持通用 API，避免写入单一业务项目的特化逻辑。
- 修改本共享库后，先运行 `npm run typecheck` 和 `pnpm run build`。
- 只有在明确需要发布新版本时，才使用 `task git:tag:next` 创建并推送新版本标签。
