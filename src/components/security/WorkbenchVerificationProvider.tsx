import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Drawer, Modal } from "antd";
import type {
  WorkbenchVerificationRequest,
  WorkbenchVerificationValues,
} from "./model";
import { WorkbenchCodeVerificationForm } from "./WorkbenchCodeVerificationForm";
import { WorkbenchPasskeyVerificationAction } from "./WorkbenchPasskeyVerificationAction";

export type WorkbenchVerificationSurface = "drawer" | "modal";

export type WorkbenchVerificationResult =
  | {
      status: "cancelled";
    }
  | {
      status: "verified";
      values: WorkbenchVerificationValues;
    };

export interface WorkbenchVerificationProviderProps {
  children: ReactNode;
  surface?: WorkbenchVerificationSurface;
  onVerify(
    values: WorkbenchVerificationValues,
    request: WorkbenchVerificationRequest,
  ): Promise<void> | void;
}

export interface WorkbenchVerificationContextValue {
  verify(request: WorkbenchVerificationRequest): Promise<WorkbenchVerificationResult>;
}

interface ActiveVerification {
  request: WorkbenchVerificationRequest;
  resolve(result: WorkbenchVerificationResult): void;
}

const WorkbenchVerificationContext = createContext<WorkbenchVerificationContextValue | null>(null);

export function WorkbenchVerificationProvider({
  children,
  surface = "modal",
  onVerify,
}: WorkbenchVerificationProviderProps) {
  const [active, setActive] = useState<ActiveVerification>();
  const [error, setError] = useState<ReactNode>();
  const [loading, setLoading] = useState(false);
  const activeRef = useRef<ActiveVerification | undefined>(undefined);
  activeRef.current = active;

  useEffect(() => {
    return () => {
      activeRef.current?.resolve({ status: "cancelled" });
    };
  }, []);

  const close = useCallback(() => {
    setActive((current) => {
      current?.resolve({ status: "cancelled" });
      return undefined;
    });
    setError(undefined);
    setLoading(false);
  }, []);

  const verify = useCallback((request: WorkbenchVerificationRequest) => {
    setError(undefined);
    setLoading(false);

    return new Promise<WorkbenchVerificationResult>((resolve) => {
      setActive((current) => {
        current?.resolve({ status: "cancelled" });
        return { request, resolve };
      });
    });
  }, []);

  const submit = useCallback(
    async (values: WorkbenchVerificationValues) => {
      const current = activeRef.current;
      if (!current) {
        return;
      }

      setError(undefined);
      setLoading(true);
      try {
        await onVerify(values, current.request);
        current.resolve({ status: "verified", values });
        setActive(undefined);
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : String(submitError || ""),
        );
      } finally {
        setLoading(false);
      }
    },
    [onVerify],
  );

  return (
    <WorkbenchVerificationContext.Provider value={{ verify }}>
      {children}
      {active ? surface === "drawer" ? (
        <Drawer destroyOnHidden open placement="right" size={420} title={null} onClose={close}>
          <VerificationContent error={error} loading={loading} request={active.request} onSubmit={submit} />
        </Drawer>
      ) : (
        <Modal centered destroyOnHidden footer={null} open title={null} width={420} onCancel={close}>
          <VerificationContent error={error} loading={loading} request={active.request} onSubmit={submit} />
        </Modal>
      ) : null}
    </WorkbenchVerificationContext.Provider>
  );
}

function VerificationContent({ error, loading, request, onSubmit }: {
  error?: ReactNode;
  loading: boolean;
  request: WorkbenchVerificationRequest;
  onSubmit(values: WorkbenchVerificationValues): Promise<void> | void;
}) {
  if (request.kind === "passkey") {
    return <WorkbenchPasskeyVerificationAction {...request} error={error} loading={loading} onSubmit={onSubmit} />;
  }
  return <WorkbenchCodeVerificationForm {...request} error={error} loading={loading} onSubmit={onSubmit} />;
}

export function useWorkbenchVerification(): WorkbenchVerificationContextValue {
  const context = useContext(WorkbenchVerificationContext);
  if (!context) {
    throw new Error("useWorkbenchVerification must be used within WorkbenchVerificationProvider");
  }

  return context;
}
