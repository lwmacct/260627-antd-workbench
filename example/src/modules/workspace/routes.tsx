import { Navigate, type RouteObject } from "react-router-dom";
import { CapacityRoute } from "./capacity/CapacityRoute";
import { EventsRoute } from "./events/EventsRoute";
import { WorkspaceLayout } from "./layout/WorkspaceLayout";
import { ServicesRoute } from "./services/ServicesRoute";

export const workspaceRoutes: RouteObject = {
  path: "workspace",
  element: <WorkspaceLayout />,
  children: [
    { index: true, element: <Navigate to="services" replace /> },
    { path: "services", element: <ServicesRoute /> },
    { path: "events", element: <EventsRoute /> },
    { path: "capacity", element: <CapacityRoute /> },
  ],
};
