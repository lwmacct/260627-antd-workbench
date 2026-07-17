import { Navigate, type RouteObject } from "react-router-dom";
import { SettingsLayout } from "./layout/SettingsLayout";
import { NotificationsRoute } from "./notifications/NotificationsRoute";
import { ProfileRoute } from "./profile/ProfileRoute";

export const settingsRoutes: RouteObject = {
  path: "settings",
  element: <SettingsLayout />,
  children: [
    { index: true, element: <Navigate to="profile" replace /> },
    { path: "profile", element: <ProfileRoute /> },
    { path: "notifications", element: <NotificationsRoute /> },
  ],
};
