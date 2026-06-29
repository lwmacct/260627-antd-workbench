import type { ReactNode } from "react";

export interface WorkbenchChallengeFieldLabels {
  captcha?: ReactNode;
  captchaCreateFailed?: string;
  refresh?: ReactNode;
  remoteChallengeConfigured?: ReactNode;
  remoteChallengeMissingSitekey?: ReactNode;
  remoteChallengeUnsupported?: ReactNode;
}

export interface WorkbenchOAuthButtonsLabels {
  loginWith?: (label: ReactNode) => ReactNode;
}

export interface WorkbenchCredentialLabels {
  challenge?: WorkbenchChallengeFieldLabels;
  confirmPassword?: ReactNode;
  confirmPasswordRequired?: string;
  confirmPasswordMismatch?: string;
  disabledLocalLogin?: ReactNode;
  disabledRegistration?: ReactNode;
  loginDescription?: ReactNode;
  loginSubmit?: ReactNode;
  loginTitle?: ReactNode;
  modeSwitchLogin?: ReactNode;
  modeSwitchLoginPrefix?: ReactNode;
  modeSwitchRegister?: ReactNode;
  modeSwitchRegisterPrefix?: ReactNode;
  oauth?: WorkbenchOAuthButtonsLabels;
  password?: ReactNode;
  passwordContainsUsername?: string;
  passwordMinLength?: string;
  passwordRequired?: string;
  registerDescription?: ReactNode;
  registerSubmit?: ReactNode;
  registerTitle?: ReactNode;
  username?: ReactNode;
  usernameRequired?: string;
}

export interface WorkbenchVerificationLabels {
  back?: ReactNode;
  code?: ReactNode;
  codeInvalid?: string;
  codeRequired?: string;
  description?: ReactNode;
  remember?: ReactNode | ((minutes: number) => ReactNode);
  submit?: ReactNode;
  title?: ReactNode;
  useAnotherMethod?: ReactNode;
  useRecoveryCode?: ReactNode;
}

export const defaultWorkbenchChallengeFieldLabels: Required<WorkbenchChallengeFieldLabels> = {
  captcha: "验证码",
  captchaCreateFailed: "认证挑战生成失败",
  refresh: "刷新验证码",
  remoteChallengeConfigured: "远程验证码已配置",
  remoteChallengeMissingSitekey: "远程验证码缺少站点公钥",
  remoteChallengeUnsupported: "远程验证码需要业务应用提供适配器",
};

export const defaultWorkbenchOAuthButtonsLabels: Required<WorkbenchOAuthButtonsLabels> = {
  loginWith: (label) => ["使用 ", label, " 登录"],
};

export const defaultWorkbenchCredentialLabels: Required<WorkbenchCredentialLabels> = {
  challenge: defaultWorkbenchChallengeFieldLabels,
  confirmPassword: "确认密码",
  confirmPasswordMismatch: "两次输入的密码不一致",
  confirmPasswordRequired: "请再次输入密码",
  disabledLocalLogin: "本地账号登录已关闭",
  disabledRegistration: "注册已关闭，请联系管理员创建账号",
  loginDescription: "使用账号或第三方身份进入控制台",
  loginSubmit: "登录",
  loginTitle: "登录",
  modeSwitchLogin: "返回登录",
  modeSwitchLoginPrefix: "已有账号？",
  modeSwitchRegister: "创建账号",
  modeSwitchRegisterPrefix: "还没有账号？",
  oauth: defaultWorkbenchOAuthButtonsLabels,
  password: "密码",
  passwordContainsUsername: "密码不能包含用户名",
  passwordMinLength: "密码至少 8 位",
  passwordRequired: "请输入密码",
  registerDescription: "创建账号后进入控制台",
  registerSubmit: "注册并进入",
  registerTitle: "注册",
  username: "用户名",
  usernameRequired: "请输入用户名",
};

export const defaultWorkbenchVerificationLabels: Required<WorkbenchVerificationLabels> = {
  back: "返回",
  code: "验证码",
  codeInvalid: "请输入有效验证码",
  codeRequired: "请输入验证码",
  description: "请输入安全验证码以继续操作。",
  remember: (minutes) => `未来 ${minutes} 分钟内不再验证`,
  submit: "验证并继续",
  title: "安全验证",
  useAnotherMethod: "使用其他验证方式",
  useRecoveryCode: "使用恢复码",
};
