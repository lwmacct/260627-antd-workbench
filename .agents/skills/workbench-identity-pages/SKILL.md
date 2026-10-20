---
name: workbench-identity-pages
description: 维护或接入 @lwmacct/260627-antd-workbench 的可复用 identity 页面. 适用于 identity API 变更, 宿主数据与回调接线, 共享包边界评审; 不用于通用 React 表单工作.
---

# Workbench identity pages

当需要新增或修改 Workbench identity 页面, 为宿主应用接线, 或判断某个 identity 需求是否应放进共享包时, 使用此技能.

## 运行边界

Identity 页面是受控的 Ant Design UI. 宿主提供 profile, 配置, session 数据, 导航, 业务文案和异步操作. 包提供表单渲染, 内置公共文案, 基础校验, 操作状态和回调编排.

不要把这些内容移入共享包:

- HTTP 请求, 缓存, 错误翻译或认证协议
- React Query, React Router, 短信或邮件 Provider, 特定后端 identity 模型
- 只对单一消费方有意义的文案或校验规则

如果能力对多个宿主通用, 优先设计通用 prop 或回调. 如果它编码了单一宿主策略, 保留在该宿主中.

## 指令

- 修改前检查 `src/components/identity/*Page.tsx` 中相关 props, 以及 `src/components/identity/model.ts` 中的当前类型. 不要凭记忆修改 API.
- 做宿主接入, 回调语义分析或 API 边界评审时, 阅读 [references/contracts.md](references/contracts.md).
- 修改组件时, 保持 `zh-CN` 与 `en-US` 双语言, 响应式 identity 样式, 以及 `src/identity.ts` 中的现有公开入口.
- 回调行为或公开契约变化时, 同步更新 reference 和覆盖该页面的 example.
- 把 workbench example 当作消费方. 宿主专属编排放在 `example/src`, 不放入可复用页面.

## 验证

共享包变更后运行 `npm run typecheck` 和 `pnpm run build`. `example/` 变更时再运行 `pnpm run build:example`. 除非用户明确要求发版, 不要创建 release 标签.
