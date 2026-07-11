import type { WorkbenchImageChallenge, WorkbenchVerificationValues } from "@lwmacct/260627-antd-workbench";

export async function createExampleImageChallenge(): Promise<WorkbenchImageChallenge> {
  return {
    challengeId: crypto.randomUUID(),
    image: "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="150" height="32"><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="22" text-anchor="middle" font-size="18">260627</text></svg>'),
    provider: "image",
  };
}

export function assertExampleVerification(values: WorkbenchVerificationValues, message: string) {
  if (values.kind === "code" && !/^\d{6}$/.test(values.code)) throw new Error(message);
}
