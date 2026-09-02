import { WorkbenchIdentityPasswordPage } from "@lwmacct/260627-antd-workbench/identity";

export function IdentityPasswordRoute() {
  return (
    <WorkbenchIdentityPasswordPage
      passwordPolicy={{ minLength: 8, maxLength: 128 }}
      onSubmit={async ({ currentPassword }) => {
        if (currentPassword === "wrong") {
          throw new Error("示例当前密码不正确");
        }
      }}
    />
  );
}
