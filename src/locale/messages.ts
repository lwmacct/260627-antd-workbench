import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import type { WorkbenchLocale, WorkbenchMessages } from "./model";

const zh: WorkbenchMessages = {
  accessDenied: { description: "当前账号无法访问此应用。", title: "没有访问权限" },
  account: { logout: "退出登录", openMenu: "打开用户导航菜单" },
  appearance: {
    accent: "强调色", black: "纯黑", compact: "紧凑", comfortable: "舒适", customAccent: "自定义强调色",
    dark: "深色", deep: "深色表面", density: "密度", light: "浅色", mode: "主题", preview: "预览",
    radius: "圆角", reset: "重置", scheme: "配色", soft: "柔和", spacious: "宽松", surface: "表面",
    system: "跟随系统", tinted: "染色表面",
  },
  appearanceControl: { open: "打开外观设置", title: "外观设置" },
  auth: { alternative: "或", retry: "重新检查", signingIn: "正在登录…" },
  codeVerification: {
    code: "验证码", codeRequired: "请输入验证码", description: "请输入安全验证码以继续操作。",
    remember: (minutes) => `未来 ${minutes} 分钟内不再验证`, submit: "验证并继续", title: "安全验证",
  },
  humanChallenge: {
    createFailed: "认证挑战生成失败", imageAlt: "验证码", label: "验证码", missingSitekey: "远程验证码缺少站点公钥",
    refresh: "刷新验证码", unsupportedRemoteProvider: "远程验证码需要业务应用提供适配器",
  },
  language: { switchLanguage: "切换语言" },
  navigation: { sectionNavigation: "分区导航" },
  oauth: { loginWith: (label) => ["使用 ", label, " 登录"] },
  passkeyVerification: { description: "使用设备上的通行密钥确认你的身份。", submit: "使用通行密钥验证", title: "通行密钥验证" },
  password: {
    confirmPassword: "确认密码", confirmPasswordMismatch: "两次输入的密码不一致", confirmPasswordRequired: "请再次输入密码",
    password: "密码", passwordMinLength: "密码至少 8 位", passwordRequired: "请输入密码", username: "用户名", usernameRequired: "请输入用户名",
  },
  passwordSignIn: { description: "使用本地账号登录", submit: "登录", title: "登录" },
  passwordSignUp: { description: "创建一个本地账号", submit: "创建账号", title: "注册" },
  tokenSignIn: {
    description: "输入访问令牌以继续", submit: "登录", title: "访问令牌登录",
    token: "访问令牌", tokenRequired: "请输入访问令牌",
  },
  verification: { back: "返回" },
};

const en: WorkbenchMessages = {
  accessDenied: { description: "Your current account cannot access this application.", title: "Access denied" },
  account: { logout: "Sign out", openMenu: "Open user navigation menu" },
  appearance: {
    accent: "Accent", black: "Black", compact: "Compact", comfortable: "Comfortable", customAccent: "Custom accent",
    dark: "Dark", deep: "Deep surface", density: "Density", light: "Light", mode: "Theme", preview: "Preview",
    radius: "Radius", reset: "Reset", scheme: "Scheme", soft: "Soft", spacious: "Spacious", surface: "Surface",
    system: "System", tinted: "Tinted surface",
  },
  appearanceControl: { open: "Open appearance settings", title: "Appearance settings" },
  auth: { alternative: "or", retry: "Check again", signingIn: "Signing in…" },
  codeVerification: {
    code: "Verification code", codeRequired: "Enter the verification code", description: "Enter a security verification code to continue.",
    remember: (minutes) => `Skip verification for ${minutes} minutes`, submit: "Verify and continue", title: "Security verification",
  },
  humanChallenge: {
    createFailed: "Failed to create authentication challenge", imageAlt: "Verification code", label: "Verification code",
    missingSitekey: "The remote challenge site key is missing", refresh: "Refresh code",
    unsupportedRemoteProvider: "The application must provide a remote challenge adapter",
  },
  language: { switchLanguage: "Switch language" },
  navigation: { sectionNavigation: "Section navigation" },
  oauth: { loginWith: (label) => ["Sign in with ", label] },
  passkeyVerification: { description: "Confirm your identity with a passkey on this device.", submit: "Verify with passkey", title: "Passkey verification" },
  password: {
    confirmPassword: "Confirm password", confirmPasswordMismatch: "Passwords do not match", confirmPasswordRequired: "Confirm your password",
    password: "Password", passwordMinLength: "Password must be at least 8 characters", passwordRequired: "Enter your password",
    username: "Username", usernameRequired: "Enter your username",
  },
  passwordSignIn: { description: "Sign in with a local account", submit: "Sign in", title: "Sign in" },
  passwordSignUp: { description: "Create a local account", submit: "Create account", title: "Create account" },
  tokenSignIn: {
    description: "Enter your access token to continue", submit: "Sign in", title: "Access token sign in",
    token: "Access token", tokenRequired: "Enter an access token",
  },
  verification: { back: "Back" },
};

export const workbenchLocales = {
  "zh-CN": { antdLocale: zhCN, documentLang: "zh-CN", messages: zh },
  "en-US": { antdLocale: enUS, documentLang: "en", messages: en },
} satisfies Record<WorkbenchLocale, { antdLocale: typeof zhCN; documentLang: string; messages: WorkbenchMessages }>;
