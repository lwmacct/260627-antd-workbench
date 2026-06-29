import type { ReactNode } from "react";

export interface WorkbenchAuthLabels {
  captcha?: ReactNode;
  captchaCreateFailed?: string;
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
  oauthLogin?: (label: ReactNode) => ReactNode;
  password?: ReactNode;
  passwordContainsUsername?: string;
  passwordMinLength?: string;
  passwordRequired?: string;
  registerDescription?: ReactNode;
  registerSubmit?: ReactNode;
  registerTitle?: ReactNode;
  remoteChallengeConfigured?: ReactNode;
  remoteChallengeMissingSitekey?: ReactNode;
  remoteChallengeUnsupported?: ReactNode;
  username?: ReactNode;
  usernameRequired?: string;
}

export const defaultWorkbenchAuthLabels: Required<WorkbenchAuthLabels> = {
  captcha: "验证码",
  captchaCreateFailed: "认证挑战生成失败",
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
  oauthLogin: (label) => ["使用 ", label, " 登录"],
  password: "密码",
  passwordContainsUsername: "密码不能包含用户名",
  passwordMinLength: "密码至少 8 位",
  passwordRequired: "请输入密码",
  registerDescription: "创建账号后进入控制台",
  registerSubmit: "注册并进入",
  registerTitle: "注册",
  remoteChallengeConfigured: "远程验证码已配置",
  remoteChallengeMissingSitekey: "远程验证码缺少站点公钥",
  remoteChallengeUnsupported: "远程验证码需要业务应用提供适配器",
  username: "用户名",
  usernameRequired: "请输入用户名",
};
