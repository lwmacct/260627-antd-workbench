import { Navigate, Outlet, createHashRouter } from "react-router-dom";
import { dashboardRoute } from "../../modules/dashboard/routes";
import { securityRoutes } from "../../modules/security/routes";
import { settingsRoutes } from "../../modules/settings/routes";
import { workspaceRoutes } from "../../modules/workspace/routes";
import { ExampleShell } from "../shell/ExampleShell";
import { examplePaths } from "./navigation";

export const router = createHashRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to={examplePaths.dashboard} replace />,
      },
      securityRoutes,
      {
        element: <ExampleShell />,
        children: [
          dashboardRoute,
          workspaceRoutes,
          settingsRoutes,
        ],
      },
      {
        path: "*",
        element: <Navigate to={examplePaths.dashboard} replace />,
      },
    ],
  },
]);
