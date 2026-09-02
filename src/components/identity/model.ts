import type { ReactNode } from "react";
import type {
  WorkbenchHumanChallengeConfig,
  WorkbenchHumanChallengeResponse,
  WorkbenchImageChallenge,
} from "../security/model";

export type WorkbenchIdentityContactKind = "email" | "phone";

export interface WorkbenchIdentityContact {
  maskedValue: string;
  verifiedAt?: string;
}

export interface WorkbenchIdentityProfile {
  avatarUrl?: string;
  contacts: Partial<Record<WorkbenchIdentityContactKind, WorkbenchIdentityContact>>;
  displayName: string;
  id: string;
  username: string;
}

export interface WorkbenchIdentityProfileValues {
  avatarUrl?: string;
  displayName: string;
}

export interface WorkbenchIdentitySignInValues {
  challenge?: WorkbenchHumanChallengeResponse;
  identifier: string;
  password: string;
}

export interface WorkbenchIdentitySignUpValues {
  challenge?: WorkbenchHumanChallengeResponse;
  confirmPassword: string;
  password: string;
  username: string;
}

export interface WorkbenchIdentityContactVerification {
  expiresAt?: string;
  retryAfterSeconds: number;
  verificationId: string;
}

export interface WorkbenchIdentityContactOption {
  enabled?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  placeholder?: string;
  validate?(value: string): string | undefined;
}

export interface WorkbenchIdentityPasswordValues {
  currentPassword: string;
  newPassword: string;
}

export interface WorkbenchIdentityPasswordPolicy {
  maxLength?: number;
  minLength?: number;
  rejectWhitespaceOnly?: boolean;
  rejectCurrentPassword?: boolean;
  validate?(value: string, currentPassword: string): string | undefined;
}

export interface WorkbenchIdentitySession {
  createdAt: string;
  current?: boolean;
  expiresAt: string;
  id: string;
  lastIp?: string;
  lastSeenAt?: string;
  loginIp?: string;
  revokedAt?: string;
  revokedReason?: string;
  userId?: string;
}

export type {
  WorkbenchHumanChallengeConfig,
  WorkbenchHumanChallengeResponse,
  WorkbenchImageChallenge,
};
