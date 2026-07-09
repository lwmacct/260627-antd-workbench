import { Navigate, type RouteObject } from "react-router-dom";
import { ComponentsLayout } from "./layout/ComponentsLayout";
import { ChallengeFieldRoute } from "./security/ChallengeFieldRoute";
import { CredentialDrawerRoute } from "./security/CredentialDrawerRoute";
import { CredentialFormRoute } from "./security/CredentialFormRoute";
import { CredentialModalRoute } from "./security/CredentialModalRoute";
import { VerificationDrawerRoute } from "./security/VerificationDrawerRoute";
import { VerificationFormRoute } from "./security/VerificationFormRoute";
import { VerificationModalRoute } from "./security/VerificationModalRoute";
import { VerificationProviderRoute } from "./security/VerificationProviderRoute";

export const componentsRoutes: RouteObject = {
  path: "components",
  element: <ComponentsLayout />,
  children: [
    { index: true, element: <Navigate to="credential-form" replace /> },
    { path: "credential-form", element: <CredentialFormRoute /> },
    { path: "credential-modal", element: <CredentialModalRoute /> },
    { path: "credential-drawer", element: <CredentialDrawerRoute /> },
    { path: "verification-form", element: <VerificationFormRoute /> },
    { path: "verification-modal", element: <VerificationModalRoute /> },
    { path: "verification-drawer", element: <VerificationDrawerRoute /> },
    { path: "verification-provider", element: <VerificationProviderRoute /> },
    { path: "challenge-field", element: <ChallengeFieldRoute /> },
  ],
};
