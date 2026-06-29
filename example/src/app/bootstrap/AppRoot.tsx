import { RouterProvider } from "react-router-dom";
import { ExampleVerificationProvider } from "../../modules/security/ExampleVerificationProvider";
import { router } from "../router";
import { AppProviders } from "./AppProviders";

export function AppRoot() {
  return (
    <AppProviders>
      <ExampleVerificationProvider>
        <RouterProvider router={router} />
      </ExampleVerificationProvider>
    </AppProviders>
  );
}
