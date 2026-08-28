export const examplePaths = {
  components: "/components/pages",
  dashboard: "/dashboard",
  pages: {
    accessDenied: "/pages/access-denied",
    login: "/pages/login",
    oauth: "/pages/oauth",
    register: "/pages/register",
    token: "/pages/token",
    verify: "/pages/verify",
  },
  settings: "/settings/profile",
  workspace: "/workspace/services",
} as const;

export type TopNavKey = "components" | "dashboard" | "pages" | "settings" | "workspace";

export function topNavFromPathname(pathname: string): TopNavKey {
  if (pathname.startsWith("/components")) {
    return "components";
  }
  if (pathname.startsWith("/pages")) {
    return "pages";
  }
  if (pathname.startsWith("/settings")) {
    return "settings";
  }
  if (pathname.startsWith("/workspace")) {
    return "workspace";
  }
  return "dashboard";
}
