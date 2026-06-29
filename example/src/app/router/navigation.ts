export const examplePaths = {
  auth: "/auth/login",
  dashboard: "/dashboard",
  settings: "/settings/appearance",
  workspace: "/workspace/services",
} as const;

export type TopNavKey = "auth" | "dashboard" | "settings" | "workspace";

export function topNavFromPathname(pathname: string): TopNavKey {
  if (pathname.startsWith("/auth")) {
    return "auth";
  }
  if (pathname.startsWith("/settings")) {
    return "settings";
  }
  if (pathname.startsWith("/workspace")) {
    return "workspace";
  }
  return "dashboard";
}
