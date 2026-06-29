export const examplePaths = {
  dashboard: "/dashboard",
  security: "/security/login",
  settings: "/settings/appearance",
  workspace: "/workspace/services",
} as const;

export type TopNavKey = "dashboard" | "security" | "settings" | "workspace";

export function topNavFromPathname(pathname: string): TopNavKey {
  if (pathname.startsWith("/security")) {
    return "security";
  }
  if (pathname.startsWith("/settings")) {
    return "settings";
  }
  if (pathname.startsWith("/workspace")) {
    return "workspace";
  }
  return "dashboard";
}
