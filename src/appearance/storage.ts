import type { WorkbenchAppearance } from "./model";
import { normalizeWorkbenchAppearance } from "./normalize";

export function readStoredAppearance(
  storageKey: false | string,
): Partial<WorkbenchAppearance> | null {
  if (storageKey === false) {
    return null;
  }

  try {
    const stored = globalThis.localStorage?.getItem(storageKey);
    return stored ? (JSON.parse(stored) as Partial<WorkbenchAppearance>) : null;
  } catch {
    return null;
  }
}

export function writeStoredAppearance(
  storageKey: false | string,
  appearance: WorkbenchAppearance,
): void {
  if (storageKey === false) {
    return;
  }

  try {
    globalThis.localStorage?.setItem(storageKey, JSON.stringify(appearance));
  } catch {
    // Storage is an optional enhancement. Ignore unavailable or quota-limited storage.
  }
}

export function resolveInitialAppearance(
  defaultAppearance: WorkbenchAppearance,
  storageKey: false | string,
): WorkbenchAppearance {
  return normalizeWorkbenchAppearance({
    ...defaultAppearance,
    ...readStoredAppearance(storageKey),
  });
}

