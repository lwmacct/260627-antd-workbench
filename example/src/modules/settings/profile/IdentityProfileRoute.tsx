import {
  WorkbenchIdentityProfilePage,
  type WorkbenchIdentityProfile,
} from "@lwmacct/260627-antd-workbench/identity";
import { useState } from "react";

const initialProfile: WorkbenchIdentityProfile = {
  id: "0192f5c0-8b0c-7d72-9b49-5a3e3f65f6a1",
  username: "demo-user",
  displayName: "Demo User",
  avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
  contacts: {},
};

export function IdentityProfileRoute() {
  const [profile, setProfile] = useState(initialProfile);

  return (
    <WorkbenchIdentityProfilePage
      profile={profile}
      contactOptions={{
        phone: { enabled: true },
        email: { enabled: true },
      }}
      onUpdateProfile={async (values) => {
        const nextProfile = { ...profile, ...values };
        setProfile(nextProfile);
        return nextProfile;
      }}
      onStartContactVerification={async ({ kind }) => ({
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        retryAfterSeconds: 2,
        verificationId: `${kind}-demo-verification`,
      })}
      onConfirmContactVerification={async ({ code, kind }) => {
        if (code !== "2468") {
          throw new Error("示例验证码为 2468");
        }
        const maskedValue = kind === "phone" ? "+861381234****" : "d***@example.com";
        const nextProfile = {
          ...profile,
          contacts: {
            ...profile.contacts,
            [kind]: { maskedValue, verifiedAt: new Date().toISOString() },
          },
        };
        setProfile(nextProfile);
        return nextProfile;
      }}
      onUnbindContact={async (kind) => {
        setProfile((current) => ({
          ...current,
          contacts: { ...current.contacts, [kind]: undefined },
        }));
      }}
    />
  );
}
