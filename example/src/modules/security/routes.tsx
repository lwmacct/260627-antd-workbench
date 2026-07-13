import { Navigate, type RouteObject } from "react-router-dom";
import { CredentialRoute } from "./CredentialRoute";
import { VerificationRoute } from "./VerificationRoute";

export const securityRoutes: RouteObject = {
  path: "security",
  children: [
    { index: true, element: <Navigate to="login" replace /> },
    { path: "login", element: <CredentialRoute mode="login" /> },
    { path: "oauth", element: <CredentialRoute mode="oauth" /> },
    { path: "access-denied", element: <CredentialRoute mode="access-denied" /> },
    { path: "register", element: <CredentialRoute mode="register" /> },
    { path: "token", element: <CredentialRoute mode="token" /> },
    { path: "verify", element: <VerificationRoute /> },
  ],
};
