export function readStoredLocale(storageKey: false | string): string | null {
  if (storageKey === false) {
    return null;
  }

  try {
    return globalThis.localStorage?.getItem(storageKey) ?? null;
  } catch {
    return null;
  }
}

export function writeStoredLocale(storageKey: false | string, locale: string): void {
  if (storageKey === false) {
    return;
  }

  try {
    globalThis.localStorage?.setItem(storageKey, locale);
  } catch {
    // Locale persistence is optional. Ignore unavailable or quota-limited storage.
  }
}

