# Identity Pages Plan

更新时间：2026-09-02

## 目标

为 `@lwmacct/260627-antd-workbench` 增加可被多个宿主应用复用的 identity 页面。页面只负责 Ant Design UI、表单校验、验证码绑定状态和回调编排，不依赖具体 HTTP API、React Query、路由或 Go identity 模块。

## 范围

- 登录页：单一登录标识输入框，支持用户名、已验证手机号或已验证邮箱。
- 注册页：只显示用户名、密码、确认密码和人机挑战，不显示手机号或邮箱。
- 个人资料页：资料编辑、脱敏联系方式展示、手机号和邮箱独立验证及解除绑定。
- 修改密码页：可配置密码策略，成功处理交由宿主。
- 会话页：当前会话、单个会话撤销和全部会话撤销。
- 中文和英文公共文案、移动端布局、example 展示。

## API 边界

页面通过受控 props 接收数据和异步回调。共享包不实现请求、缓存、错误翻译或导航。

联系方式验证必须按 `phone` 和 `email` 分别维护 pending、倒计时、loading 和错误状态；确认成功后只通过回调返回新的 profile，不保存明文联系方式。

## 实施顺序

1. 增加 `src/components/identity`、`src/identity.ts`、identity 类型和样式。
2. 增加 identity 专用登录表单的 `identifier` 语义；保留 security 低层组件的独立 username 表单能力，注册页面保持严格的用户名密码流程。
3. 在 example 增加 identity 页面演示和路由。
4. 运行 `pnpm run typecheck`、`pnpm run build`、`pnpm run build:example`。
5. 执行 `task git:tag:next` 发布 Workbench。
6. 控制台改用已发布版本，接入新的 profile、password、sessions 页面，删除宿主中的重复页面实现。
7. 控制台运行 typecheck、lint、build 和测试后提交本次变更。

## 明确不做

- 不新增短信或邮件 Provider。
- 不在共享包中加入 fetch、React Query、React Router 或宿主业务文案。
- 不使用 `go.work` 链接 Workbench；控制台只引用已发布 npm 版本。
- 不保留已废弃的 `username_key` 或任何旧联系方式字段。
