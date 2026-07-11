import { createContext, useContext } from "react";
import type { WorkbenchLocaleContextValue } from "./model";

export const WorkbenchLocaleContext =
  createContext<WorkbenchLocaleContextValue | null>(null);

export function useWorkbenchLocale(): WorkbenchLocaleContextValue {
  const context = useContext(WorkbenchLocaleContext);

  if (!context) {
    throw new Error("useWorkbenchLocale must be used within WorkbenchProvider.");
  }

  return context;
}
