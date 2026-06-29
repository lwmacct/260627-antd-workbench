import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { WorkbenchVerificationLabels } from "./labels";
import type {
  WorkbenchVerificationRequest,
  WorkbenchVerificationSubmitValues,
} from "./model";
import { WorkbenchVerificationDrawer } from "./WorkbenchVerificationDrawer";
import { WorkbenchVerificationModal } from "./WorkbenchVerificationModal";

export type WorkbenchVerificationSurface = "drawer" | "modal";

export type WorkbenchVerificationResult =
  | {
      status: "cancelled";
    }
  | {
      status: "verified";
      values: WorkbenchVerificationSubmitValues;
    };

export interface WorkbenchVerificationProviderProps {
  children: ReactNode;
  labels?: WorkbenchVerificationLabels;
  surface?: WorkbenchVerificationSurface;
  onVerify(
    values: WorkbenchVerificationSubmitValues,
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
  labels,
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
    async (values: WorkbenchVerificationSubmitValues) => {
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
      {active ? (
        surface === "drawer" ? (
          <WorkbenchVerificationDrawer
            {...active.request}
            error={error}
            labels={labels}
            loading={loading}
            open
            onClose={close}
            onSubmit={submit}
          />
        ) : (
          <WorkbenchVerificationModal
            {...active.request}
            error={error}
            labels={labels}
            loading={loading}
            open
            onCancel={close}
            onSubmit={submit}
          />
        )
      ) : null}
    </WorkbenchVerificationContext.Provider>
  );
}

export function useWorkbenchVerification(): WorkbenchVerificationContextValue {
  const context = useContext(WorkbenchVerificationContext);
  if (!context) {
    throw new Error("useWorkbenchVerification must be used within WorkbenchVerificationProvider");
  }

  return context;
}
