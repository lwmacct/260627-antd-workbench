import {
  WorkbenchIdentitySessionsPage,
  type WorkbenchIdentitySession,
} from "@lwmacct/260627-antd-workbench/identity";
import { useState } from "react";

const initialSessions: WorkbenchIdentitySession[] = [
  {
    id: "current",
    current: true,
    loginIp: "127.0.0.1",
    lastIp: "127.0.0.1",
    createdAt: "2026-09-02T08:00:00.000Z",
    lastSeenAt: "2026-09-02T10:00:00.000Z",
    expiresAt: "2026-10-02T08:00:00.000Z",
  },
  {
    id: "other-device",
    current: false,
    loginIp: "192.0.2.20",
    lastIp: "192.0.2.21",
    createdAt: "2026-08-28T08:00:00.000Z",
    lastSeenAt: "2026-09-01T11:00:00.000Z",
    expiresAt: "2026-09-28T08:00:00.000Z",
  },
];

export function IdentitySessionsRoute() {
  const [sessions, setSessions] = useState(initialSessions);

  return (
    <WorkbenchIdentitySessionsPage
      sessions={sessions}
      onRevokeSession={async (sessionId) => {
        setSessions((current) =>
          current.map((session) =>
            session.id === sessionId
              ? { ...session, revokedAt: new Date().toISOString(), revokedReason: "demo" }
              : session,
          ),
        );
      }}
      onRevokeAll={async () => {
        setSessions((current) =>
          current.map((session) =>
            session.current || session.revokedAt
              ? session
              : { ...session, revokedAt: new Date().toISOString(), revokedReason: "logout_all" },
          ),
        );
      }}
    />
  );
}
