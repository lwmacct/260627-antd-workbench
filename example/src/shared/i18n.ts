import {
  useWorkbenchLocale,
  type WorkbenchAppearanceSettingsLabels,
} from "@lwmacct/260627-antd-workbench";

interface ExampleCredentialLabels { [key: string]: unknown }
interface ExampleVerificationLabels { codeInvalid?: string; [key: string]: unknown }

interface ExampleText {
  components: {
    challengeField: string;
    challengeFieldDescription: string;
    challengeGroup: string;
    challengeReady: string;
    credentialDrawer: string;
    credentialDrawerDescription: string;
    credentialForm: string;
    credentialFormDescription: string;
    credentialGroup: string;
    credentialModal: string;
    credentialModalDescription: string;
    credentialSubmitted(mode: string, username: string): string;
    imageChallenge: string;
    oauthSelected(provider: string): string;
    openCredentialDrawer: string;
    openCredentialModal: string;
    openVerificationDrawer: string;
    openVerificationModal: string;
    remoteChallenge: string;
    remoteChallengeAdapter(provider: string): string;
    resolveRemoteChallenge: string;
    tokenSubmitted: string;
    verificationForm: string;
    verificationFormDescription: string;
    verificationGroup: string;
    verificationModal: string;
    verificationModalDescription: string;
    verificationDrawer: string;
    verificationDrawerDescription: string;
    verificationProvider: string;
    verificationProviderDescription: string;
    verificationSubmitted(method: string): string;
  };
  security: {
    back: string;
    backToLogin: string;
    challengeTypeError: string;
    credentialLabels: ExampleCredentialLabels;
    sensitiveAction: string;
    sensitiveActionCancelled: string;
    sensitiveActionDescription: string;
    sensitiveActionTitle: string;
    sensitiveActionVerified: string;
    tokenRejected: string;
    verificationDescription(subject?: string): string;
    verificationLabels: ExampleVerificationLabels;
    verificationRememberMinutes: number;
  };
  dashboard: {
    blocked: string;
    createTask: string;
    description: string;
    done: string;
    health: string;
    high: string;
    inProgress: string;
    normal: string;
    owner: string;
    priority: string;
    processed: string;
    queue: string;
    service: string;
    status: string;
    title: string;
  };
  settings: {
    appearance: string;
    appearanceCard: string;
    appearanceDescription: string;
    appearanceLabels: WorkbenchAppearanceSettingsLabels;
    email: string;
    group: string;
    name: string;
    notifications: string;
    notificationsCard: string;
    notificationsDescription: string;
    operationsAlert: string;
    profile: string;
    profileDescription: string;
    role: string;
  };
  shell: {
    components: string;
    dashboard: string;
    security: string;
    source: string;
    settings: string;
    workspace: string;
  };
  workspace: {
    accessPolicy: string;
    capacity: string;
    capacityDescription: string;
    capacityUsage: string;
    changeQueue: string;
    configurationChanges: string;
    events: string;
    eventsDescription: string;
    eventItems: string[];
    group: string;
    healthy: string;
    pending: string;
    searchServices: string;
    services: string;
    servicesDescription: string;
    stableServiceCopy: string;
  };
}

const zh: ExampleText = {
  components: {
    challengeField: "ChallengeField",
    challengeFieldDescription: "演示图片验证码和远程 challenge adapter 的接入方式。",
    challengeGroup: "Challenge",
    challengeReady: "验证码响应已生成。",
    credentialDrawer: "CredentialDrawer",
    credentialDrawerDescription: "抽屉容器适合从当前工作流侧边拉起登录或注册。",
    credentialForm: "账号表单",
    credentialFormDescription: "纯表单组件不绑定页面、弹窗或路由，适合嵌入业务自定义容器。",
    credentialGroup: "账号",
    credentialModal: "CredentialModal",
    credentialModalDescription: "弹窗容器适合页面内临时登录、注册或重新认证入口。",
    credentialSubmitted: (mode, username) =>
      `${mode === "register" ? "注册" : "登录"}提交：${username}`,
    imageChallenge: "图片验证码",
    oauthSelected: (provider) => `选择了 ${provider} 登录。`,
    openCredentialDrawer: "打开登录抽屉",
    openCredentialModal: "打开登录弹窗",
    openVerificationDrawer: "打开验证抽屉",
    openVerificationModal: "打开验证弹窗",
    remoteChallenge: "远程 Challenge 适配器",
    remoteChallengeAdapter: (provider) => `${provider} 由业务应用渲染，这里演示 adapter 接入点。`,
    resolveRemoteChallenge: "模拟通过",
    tokenSubmitted: "访问令牌已提交。",
    verificationForm: "验证表单",
    verificationFormDescription: "纯验证表单适合嵌入自定义面板，并由业务控制提交结果。",
    verificationGroup: "验证",
    verificationModal: "VerificationModal",
    verificationModalDescription: "弹窗验证适合页面内敏感操作前的短流程确认。",
    verificationDrawer: "VerificationDrawer",
    verificationDrawerDescription: "抽屉验证适合侧边工作流或需要保留页面上下文的操作。",
    verificationProvider: "VerificationProvider",
    verificationProviderDescription: "Provider 提供 Promise 式编排，子组件可按需请求安全验证。",
    verificationSubmitted: (method) => `${method} 验证已提交。`,
  },
  security: {
    back: "返回总览",
    backToLogin: "返回登录",
    challengeTypeError: "验证码类型不匹配",
    credentialLabels: {},
    sensitiveAction: "敏感操作验证",
    sensitiveActionCancelled: "验证已取消，操作未执行。",
    sensitiveActionDescription: "页面内敏感操作通过 Provider 拉起验证弹窗，验证成功后再继续业务动作。",
    sensitiveActionTitle: "页面内验证",
    sensitiveActionVerified: "验证通过，可以继续执行敏感操作。",
    tokenRejected: "示例认证服务拒绝了该访问令牌。",
    verificationDescription: (subject) =>
      subject ? `请输入 ${subject} 的安全验证码。` : "请输入安全验证码以继续操作。",
    verificationLabels: {
      code: "动态验证码",
      codeInvalid: "请输入 6 位数字验证码",
      codeRequired: "请输入 6 位动态验证码",
      remember: (minutes: number) => `未来 ${minutes} 分钟内不再验证`,
      submit: "验证并继续",
      title: "安全验证",
    },
    verificationRememberMinutes: 30,
  },
  dashboard: {
    blocked: "阻塞",
    createTask: "新建任务",
    description: "今日运营队列和关键指标。",
    done: "完成",
    health: "服务健康度",
    high: "高",
    inProgress: "进行中",
    normal: "普通",
    owner: "负责人",
    priority: "优先级",
    processed: "已处理",
    queue: "处理队列",
    service: "服务",
    status: "状态",
    title: "总览",
  },
  settings: {
    appearance: "外观",
    appearanceCard: "主题样式",
    appearanceDescription: "库内置外观面板由使用方按需放置。",
    appearanceLabels: {},
    email: "邮箱",
    group: "系统设置",
    name: "姓名",
    notifications: "通知",
    notificationsCard: "通知策略",
    notificationsDescription: "通知页演示分区导航下的另一个表单页面。",
    operationsAlert: "运行告警",
    profile: "账号",
    profileDescription: "账号页是 settings 模块下的普通子路由。",
    role: "角色",
  },
  shell: {
    components: "组件",
    dashboard: "总览",
    security: "安全",
    settings: "设置",
    source: "源码",
    workspace: "工作区",
  },
  workspace: {
    accessPolicy: "访问策略",
    capacity: "容量计划",
    capacityDescription: "容量页演示同一模块下的另一个子路由。",
    capacityUsage: "资源使用率",
    changeQueue: "等待审批的变更会在这里形成业务队列。",
    configurationChanges: "配置变更",
    events: "实时事件",
    eventsDescription: "事件页来自 workspace 模块自己的路由。",
    eventItems: ["Billing 服务扩容完成", "Gateway 发布灰度规则", "Scheduler 等待审批"],
    group: "工作区",
    healthy: "正常",
    pending: "待处理",
    searchServices: "搜索服务",
    services: "服务列表",
    servicesDescription: "模块内页面仍然可以组合更细的工作区布局。",
    stableServiceCopy: "当前服务运行稳定，最近 24 小时无高危告警。",
  },
};

const en: ExampleText = {
  components: {
    challengeField: "ChallengeField",
    challengeFieldDescription:
      "Shows image challenges and the adapter point for remote challenge providers.",
    challengeGroup: "Challenge",
    challengeReady: "Challenge response is ready.",
    credentialDrawer: "CredentialDrawer",
    credentialDrawerDescription:
      "The drawer surface opens credential flows beside the current workflow.",
    credentialForm: "Credential form",
    credentialFormDescription:
      "The headless form can be embedded in an app-owned page, panel, or shell.",
    credentialGroup: "Credential",
    credentialModal: "CredentialModal",
    credentialModalDescription:
      "The modal surface fits temporary sign-in, registration, or re-authentication.",
    credentialSubmitted: (mode, username) => `${mode} submitted for ${username}.`,
    imageChallenge: "Image challenge",
    oauthSelected: (provider) => `${provider} login selected.`,
    openCredentialDrawer: "Open credential drawer",
    openCredentialModal: "Open credential modal",
    openVerificationDrawer: "Open verification drawer",
    openVerificationModal: "Open verification modal",
    remoteChallenge: "Remote challenge adapter",
    remoteChallengeAdapter: (provider) =>
      `${provider} is rendered by the app; this shows the adapter point.`,
    resolveRemoteChallenge: "Resolve",
    tokenSubmitted: "Access token submitted.",
    verificationForm: "Verification form",
    verificationFormDescription:
      "The verification form can be embedded in a custom panel while the app owns submit handling.",
    verificationGroup: "Verification",
    verificationModal: "VerificationModal",
    verificationModalDescription:
      "The modal surface fits short verification flows before sensitive actions.",
    verificationDrawer: "VerificationDrawer",
    verificationDrawerDescription:
      "The drawer surface keeps page context visible during side workflows.",
    verificationProvider: "VerificationProvider",
    verificationProviderDescription:
      "The provider exposes promise-based orchestration for in-page verification requests.",
    verificationSubmitted: (method) => `${method} verification submitted.`,
  },
  security: {
    back: "Back to dashboard",
    backToLogin: "Back to sign in",
    challengeTypeError: "Challenge type mismatch",
    credentialLabels: {
      challenge: {
        captcha: "Captcha",
        captchaCreateFailed: "Failed to create challenge",
        refresh: "Refresh captcha",
        remoteChallengeConfigured: "Remote challenge configured",
        remoteChallengeMissingSitekey: "Remote challenge is missing a site key",
        remoteChallengeUnsupported: "Remote challenge requires an app adapter",
      },
      confirmPassword: "Confirm password",
      confirmPasswordMismatch: "Passwords do not match",
      confirmPasswordRequired: "Please confirm your password",
      disabledLocalLogin: "Local account login is disabled",
      disabledRegistration: "Registration is disabled. Contact an administrator.",
      loginDescription: "Use a local account or an external identity provider.",
      loginSubmit: "Sign in",
      loginTitle: "Sign in",
      modeSwitchLogin: "Back to sign in",
      modeSwitchLoginPrefix: "Already have an account?",
      modeSwitchRegister: "Create account",
      modeSwitchRegisterPrefix: "New here?",
      oauth: {
        loginWith: (label: unknown) => ["Continue with ", label],
      },
      password: "Password",
      passwordContainsUsername: "Password cannot contain the username",
      passwordMinLength: "Password must be at least 8 characters",
      passwordRequired: "Enter your password",
      registerDescription: "Create an account to enter the console.",
      registerSubmit: "Create account",
      registerTitle: "Register",
      username: "Username",
      usernameRequired: "Enter your username",
    },
    sensitiveAction: "Sensitive action verification",
    sensitiveActionCancelled: "Verification was cancelled. No action was applied.",
    sensitiveActionDescription:
      "Sensitive in-page actions can request verification through the provider before continuing.",
    sensitiveActionTitle: "In-page verification",
    sensitiveActionVerified: "Verification passed. The sensitive action can continue.",
    tokenRejected: "The example authentication service rejected this access token.",
    verificationDescription: (subject) =>
      subject
        ? `Enter the security code for ${subject}.`
        : "Enter a security code to continue.",
    verificationLabels: {
      code: "Authenticator code",
      codeInvalid: "Enter a 6-digit numeric code",
      codeRequired: "Enter a 6-digit authenticator code",
      remember: (minutes: number) => `Do not ask again for ${minutes} minutes`,
      submit: "Verify and continue",
      title: "Security verification",
    },
    verificationRememberMinutes: 30,
  },
  dashboard: {
    blocked: "Blocked",
    createTask: "New task",
    description: "Today’s operations queue and key indicators.",
    done: "Done",
    health: "Service health",
    high: "High",
    inProgress: "In progress",
    normal: "Normal",
    owner: "Owner",
    priority: "Priority",
    processed: "Processed",
    queue: "Work queue",
    service: "Service",
    status: "Status",
    title: "Dashboard",
  },
  settings: {
    appearance: "Appearance",
    appearanceCard: "Theme",
    appearanceDescription: "The built-in appearance panel can be placed by the app.",
    appearanceLabels: {
      accent: "Accent",
      black: "Black",
      compact: "Compact",
      comfortable: "Comfortable",
      customAccent: "Custom accent",
      dark: "Dark",
      deep: "Deep",
      density: "Density",
      light: "Light",
      mode: "Mode",
      preview: "Preview",
      radius: "Radius",
      reset: "Reset",
      scheme: "Scheme",
      soft: "Soft",
      spacious: "Spacious",
      surface: "Surface",
      system: "System",
      tinted: "Tinted",
    },
    email: "Email",
    group: "System settings",
    name: "Name",
    notifications: "Notifications",
    notificationsCard: "Notification policy",
    notificationsDescription: "A second form page under grouped section navigation.",
    operationsAlert: "Operations alerts",
    profile: "Account",
    profileDescription: "A normal child route under the settings module.",
    role: "Role",
  },
  shell: {
    components: "Components",
    dashboard: "Dashboard",
    security: "Security",
    settings: "Settings",
    source: "Source",
    workspace: "Workspace",
  },
  workspace: {
    accessPolicy: "Access policy",
    capacity: "Capacity planning",
    capacityDescription: "Another child route under the workspace module.",
    capacityUsage: "Resource usage",
    changeQueue: "Pending changes form the operational queue here.",
    configurationChanges: "Configuration changes",
    events: "Live events",
    eventsDescription: "This page is owned by the workspace module route.",
    eventItems: [
      "Billing service scaled successfully",
      "Gateway released a canary rule",
      "Scheduler is waiting for approval",
    ],
    group: "Workspace",
    healthy: "Healthy",
    pending: "Pending",
    searchServices: "Search services",
    services: "Services",
    servicesDescription: "Module pages can still compose more detailed workspace layouts.",
    stableServiceCopy: "The service is stable with no critical alerts in the last 24 hours.",
  },
};

export function useExampleText(): ExampleText {
  const { locale } = useWorkbenchLocale();
  return locale === "en-US" ? en : zh;
}
