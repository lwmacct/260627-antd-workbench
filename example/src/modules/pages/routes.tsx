import { Navigate, type RouteObject } from "react-router-dom";
import { CredentialRoute } from "../security/CredentialRoute";
import { IdentityAuthRoute } from "../security/IdentityAuthRoute";
import { VerificationRoute } from "../security/VerificationRoute";

export const pagesRoutes: RouteObject = {
  path: "pages",
  children: [
    { index: true, element: <Navigate to="login" replace /> },
    { path: "login", element: <CredentialRoute mode="login" /> },
    { path: "identity-login", element: <IdentityAuthRoute mode="login" /> },
    { path: "oauth", element: <CredentialRoute mode="oauth" /> },
    { path: "access-denied", element: <CredentialRoute mode="access-denied" /> },
    { path: "register", element: <CredentialRoute mode="register" /> },
    { path: "identity-register", element: <IdentityAuthRoute mode="register" /> },
    { path: "token", element: <CredentialRoute mode="token" /> },
    { path: "verify", element: <VerificationRoute /> },
  ],
};
