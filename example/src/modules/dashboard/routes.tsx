import type { RouteObject } from "react-router-dom";
import { DashboardRoute } from "./DashboardRoute";

export const dashboardRoute: RouteObject = {
  path: "dashboard",
  element: <DashboardRoute />,
};
