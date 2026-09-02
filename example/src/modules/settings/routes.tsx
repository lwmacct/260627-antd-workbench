import { Navigate, type RouteObject } from "react-router-dom";
import { SettingsLayout } from "./layout/SettingsLayout";
import { NotificationsRoute } from "./notifications/NotificationsRoute";
import { IdentityPasswordRoute } from "./password/IdentityPasswordRoute";
import { IdentityProfileRoute } from "./profile/IdentityProfileRoute";
import { IdentitySessionsRoute } from "./sessions/IdentitySessionsRoute";

export const settingsRoutes: RouteObject = {
  path: "settings",
  element: <SettingsLayout />,
  children: [
    { index: true, element: <Navigate to="profile" replace /> },
    { path: "profile", element: <IdentityProfileRoute /> },
    { path: "password", element: <IdentityPasswordRoute /> },
    { path: "sessions", element: <IdentitySessionsRoute /> },
    { path: "notifications", element: <NotificationsRoute /> },
  ],
};
