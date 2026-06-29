import { Navigate, type RouteObject } from "react-router-dom";
import { AuthRoute } from "./AuthRoute";

export const authRoutes: RouteObject = {
  path: "auth",
  children: [
    { index: true, element: <Navigate to="login" replace /> },
    { path: "login", element: <AuthRoute mode="login" /> },
    { path: "register", element: <AuthRoute mode="register" /> },
  ],
};
