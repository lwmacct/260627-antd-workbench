# Identity page contracts

## 公开面

从 `@lwmacct/260627-antd-workbench/identity` 导入页面和类型. 源码位于 `src/components/identity/`, 公开入口是 `src/identity.ts`.

所有页面通过 `useWorkbenchLocale()` 读取文案, 因此宿主必须把它们渲染在 `WorkbenchProvider` 下方.

## 页面边界

| 页面 | 宿主提供的数据 | 主要宿主回调 | UI 职责 |
| --- | --- | --- | --- |
| `WorkbenchIdentitySignInPage` | brand, challenge 配置, 公共 error 和 loading 状态 | `onSubmit` | 单一 identifier 与密码表单, 可选人机挑战 |
| `WorkbenchIdentitySignUpPage` | brand, challenge 配置, 公共 error 和 loading 状态 | `onSubmit` | 用户名, 密码, 确认密码, 条款和可选人机挑战 |
| `WorkbenchIdentityProfilePage` | 当前 profile 与 contact 配置 | `onUpdateProfile`, `onStartContactVerification`, `onConfirmContactVerification`, 可选 `onUnbindContact` | 资料表单与独立联系方式绑定流程 |
| `WorkbenchIdentityPasswordPage` | 当前 error, loading 状态与密码策略 | `onSubmit` | 当前密码和新密码校验与确认 |
| `WorkbenchIdentitySessionsPage` | session 数组, error 与 loading 状态 | 可选 `onRevokeSession` 与 `onRevokeAll` | 会话表格, 确认弹窗, 单行与批量操作状态 |

## Identifier 语义

登录表单暴露一个 `identifier` 值. 宿主可以接受用户名, 已验证手机号或已验证邮箱, 但共享页面不分类, 也不校验它是哪一种. 后端解释属于 `onSubmit` 宿主回调.

注册表单有意只接受 `username`, `password` 和 `confirmPassword`. 除非可复用产品边界变化, 不要增加手机号或邮箱注册字段. 它当前内置的最小密码长度是 8; `WorkbenchIdentityPasswordPage` 的可配置策略不适用于注册页.

## 回调与错误语义

- 密码, profile 和 sessions 页面会捕获回调错误并显示内部 error alert. 宿主也可以传入外部 `error` prop.
- 登录和注册页在 `onSubmit` reject 时重置人机挑战, 但不会生成业务错误文案. 宿主应从 rejection 设置自己的 `error` prop.
- `loading` prop 表示宿主数据或提交状态. 页面等待必需回调时也会管理按钮级 loading.
- Props 允许的地方, 宿主回调可以返回 Promise 或普通值. 当页面负责展示失败时, 抛出带有可展示文案的 `Error`.

## Profile 与联系方式验证

`WorkbenchIdentityProfile` 只保存脱敏联系方式:

- `contacts.phone` 与 `contacts.email` 都是可选字段
- 已存在的 contact 必须有 `maskedValue`, 可以有 `verifiedAt`
- 页面不会在 profile 模型中持久化明文联系方式

`onStartContactVerification` 接收 `{ kind, value }`, 必须返回包含 `verificationId` 与 `retryAfterSeconds` 的 `WorkbenchIdentityContactVerification`. `expiresAt` 是可选字段. `onConfirmContactVerification` 接收验证码, 联系方式种类和 verification ID, 然后返回下一个 profile 或 `void`.

页面为 `phone` 与 `email` 分别维护 pending 输入, 倒计时, loading 和失败状态. 宿主不能把它们合并成一个泛用的 contact 流程. 即使某个 contact 选项被禁用, 这些回调仍是 TypeScript 必需 props; 在种类不可用时提供 no-op 或宿主侧 guard.

`onUpdateProfile` 只提交 `displayName` 与可选 `avatarUrl`. 返回下一个 profile 会让页面更新本地展示; 返回 `void` 时, 页面保留之前传入的 profile 对象.

## Sessions

宿主持有权威 session 列表. 撤销回调成功后, 宿主更新数组, 通常设置 `revokedAt`, 并可选择性设置 `revokedReason`. 页面不会自行变更 props.

Sessions 页面会用 `current: true` 标记当前会话, 对当前会话和已撤销行隐藏单行撤销操作, 并且只有存在其他活跃会话时才显示全部撤销. 除非宿主有意实现不同的后端行为, `onRevokeAll` 应保留当前会话.

## 变更评审

- 新文案必须同时加入 `src/locale/messages.ts` 的两个 locale 词典
- 新样式放在 identity 样式旁边, 使用现有 Workbench 或 Ant Design token, 不使用应用专属颜色
- 保持公开导出有意为之, 主入口与 `identity` 子入口不能分叉
- 行为或 props 变化时, 更新 `example/src/modules/` 下相关 route
- 确认 `src/components/identity/` 中没有进入 fetch, router, query cache, provider 或明文联系方式持久化
