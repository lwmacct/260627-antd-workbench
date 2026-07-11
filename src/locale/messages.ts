import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import type { WorkbenchLocale, WorkbenchMessages } from "./model";

const zh: WorkbenchMessages = {
  account: { logout: "退出此工具", menu: "用户菜单" },
  appearance: {
    accent: "强调色", black: "纯黑", compact: "紧凑", comfortable: "舒适", customAccent: "自定义强调色",
    dark: "深色", deep: "深色表面", density: "密度", light: "浅色", mode: "主题", preview: "预览",
    radius: "圆角", reset: "重置", scheme: "配色", soft: "柔和", spacious: "宽松", surface: "表面",
    system: "跟随系统", tinted: "染色表面",
  },
  auth: { retry: "重新检查" },
  challenge: {
    captcha: "验证码", captchaCreateFailed: "认证挑战生成失败", refresh: "刷新验证码",
    remoteChallengeConfigured: "远程验证码已配置", remoteChallengeMissingSitekey: "远程验证码缺少站点公钥",
    remoteChallengeUnsupported: "远程验证码需要业务应用提供适配器",
  },
  credential: undefined as never,
  language: { switchLanguage: "切换语言", toggleLabel: "中 / EN" },
  navigation: { sectionNavigation: "分区导航" },
  oauth: { loginWith: (label) => ["使用 ", label, " 登录"] },
  theme: { switchTheme: "切换主题", switchToDark: "切换深色模式", switchToLight: "切换浅色模式" },
  verification: {
    back: "返回", code: "验证码", codeInvalid: "请输入有效验证码", codeRequired: "请输入验证码",
    description: "请输入安全验证码以继续操作。", remember: (minutes) => `未来 ${minutes} 分钟内不再验证`,
    submit: "验证并继续", title: "安全验证", useAnotherMethod: "使用其他验证方式", useRecoveryCode: "使用恢复码",
  },
};
zh.credential = {
  challenge: zh.challenge, confirmPassword: "确认密码", confirmPasswordMismatch: "两次输入的密码不一致",
  confirmPasswordRequired: "请再次输入密码", disabledLocalLogin: "本地账号登录已关闭",
  disabledRegistration: "注册已关闭，请联系管理员创建账号", loginDescription: "使用账号或第三方身份进入控制台",
  loginSubmit: "登录", loginTitle: "登录", modeSwitchLogin: "返回登录", modeSwitchLoginPrefix: "已有账号？",
  modeSwitchRegister: "创建账号", modeSwitchRegisterPrefix: "还没有账号？", oauth: zh.oauth, password: "密码",
  passwordContainsUsername: "密码不能包含用户名", passwordMinLength: "密码至少 8 位", passwordRequired: "请输入密码",
  registerDescription: "创建账号后进入控制台", registerSubmit: "注册并进入", registerTitle: "注册",
  username: "用户名", usernameRequired: "请输入用户名",
};

const en: WorkbenchMessages = {
  account: { logout: "Sign out of this tool", menu: "User menu" },
  appearance: {
    accent: "Accent", black: "Black", compact: "Compact", comfortable: "Comfortable", customAccent: "Custom accent",
    dark: "Dark", deep: "Deep surface", density: "Density", light: "Light", mode: "Theme", preview: "Preview",
    radius: "Radius", reset: "Reset", scheme: "Scheme", soft: "Soft", spacious: "Spacious", surface: "Surface",
    system: "System", tinted: "Tinted surface",
  },
  auth: { retry: "Check again" },
  challenge: {
    captcha: "Verification code", captchaCreateFailed: "Failed to create authentication challenge", refresh: "Refresh code",
    remoteChallengeConfigured: "Remote challenge configured", remoteChallengeMissingSitekey: "Remote challenge site key is missing",
    remoteChallengeUnsupported: "The application must provide a remote challenge adapter",
  },
  credential: undefined as never,
  language: { switchLanguage: "Switch language", toggleLabel: "EN / 中" },
  navigation: { sectionNavigation: "Section navigation" },
  oauth: { loginWith: (label) => ["Sign in with ", label] },
  theme: { switchTheme: "Switch theme", switchToDark: "Switch to dark mode", switchToLight: "Switch to light mode" },
  verification: {
    back: "Back", code: "Verification code", codeInvalid: "Enter a valid verification code", codeRequired: "Enter the verification code",
    description: "Enter a security verification code to continue.", remember: (minutes) => `Skip verification for ${minutes} minutes`,
    submit: "Verify and continue", title: "Security verification", useAnotherMethod: "Use another method", useRecoveryCode: "Use a recovery code",
  },
};
en.credential = {
  challenge: en.challenge, confirmPassword: "Confirm password", confirmPasswordMismatch: "Passwords do not match",
  confirmPasswordRequired: "Confirm your password", disabledLocalLogin: "Local account sign-in is disabled",
  disabledRegistration: "Registration is disabled; contact an administrator", loginDescription: "Sign in with an account or identity provider",
  loginSubmit: "Sign in", loginTitle: "Sign in", modeSwitchLogin: "Back to sign in", modeSwitchLoginPrefix: "Already have an account?",
  modeSwitchRegister: "Create account", modeSwitchRegisterPrefix: "Need an account?", oauth: en.oauth, password: "Password",
  passwordContainsUsername: "Password cannot contain the username", passwordMinLength: "Password must be at least 8 characters",
  passwordRequired: "Enter your password", registerDescription: "Create an account to enter the console",
  registerSubmit: "Register and continue", registerTitle: "Register", username: "Username", usernameRequired: "Enter your username",
};

export const workbenchLocales = {
  "zh-CN": { antdLocale: zhCN, documentLang: "zh-CN", messages: zh },
  "en-US": { antdLocale: enUS, documentLang: "en", messages: en },
} satisfies Record<WorkbenchLocale, { antdLocale: typeof zhCN; documentLang: string; messages: WorkbenchMessages }>;
