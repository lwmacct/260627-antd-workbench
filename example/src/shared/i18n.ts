import {
  useWorkbenchLocale,
  type WorkbenchAppearanceSettingsLabels,
  type WorkbenchCredentialLabels,
  type WorkbenchVerificationLabels,
} from "@lwmacct/260627-antd-workbench";

interface ExampleText {
  security: {
    back: string;
    backToLogin: string;
    challengeTypeError: string;
    credentialLabels: WorkbenchCredentialLabels;
    sensitiveAction: string;
    verificationDescription(subject?: string): string;
    verificationLabels: WorkbenchVerificationLabels;
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
  security: {
    back: "返回总览",
    backToLogin: "返回登录",
    challengeTypeError: "验证码类型不匹配",
    credentialLabels: {},
    sensitiveAction: "敏感操作验证",
    verificationDescription: (subject) =>
      subject ? `请输入 ${subject} 的安全验证码。` : "请输入安全验证码以继续操作。",
    verificationLabels: {
      code: "动态验证码",
      codeInvalid: "请输入 6 位数字验证码",
      codeRequired: "请输入 6 位动态验证码",
      remember: (minutes) => `未来 ${minutes} 分钟内不再验证`,
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
  security: {
    back: "Back to dashboard",
    backToLogin: "Back to sign in",
    challengeTypeError: "Challenge type mismatch",
    credentialLabels: {
      captcha: "Captcha",
      captchaCreateFailed: "Failed to create challenge",
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
      oauthLogin: (label) => ["Continue with ", label],
      password: "Password",
      passwordContainsUsername: "Password cannot contain the username",
      passwordMinLength: "Password must be at least 8 characters",
      passwordRequired: "Enter your password",
      registerDescription: "Create an account to enter the console.",
      registerSubmit: "Create account",
      registerTitle: "Register",
      remoteChallengeConfigured: "Remote challenge configured",
      remoteChallengeMissingSitekey: "Remote challenge is missing a site key",
      remoteChallengeUnsupported: "Remote challenge requires an app adapter",
      username: "Username",
      usernameRequired: "Enter your username",
    },
    sensitiveAction: "Sensitive action verification",
    verificationDescription: (subject) =>
      subject
        ? `Enter the security code for ${subject}.`
        : "Enter a security code to continue.",
    verificationLabels: {
      code: "Authenticator code",
      codeInvalid: "Enter a 6-digit numeric code",
      codeRequired: "Enter a 6-digit authenticator code",
      remember: (minutes) => `Do not ask again for ${minutes} minutes`,
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
  return locale === "en" ? en : zh;
}
