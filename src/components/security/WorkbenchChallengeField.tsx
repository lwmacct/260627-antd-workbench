import { ReloadOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useCallback, useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import type { WorkbenchChallengeFieldLabels } from "./labels";
import { useWorkbenchLocale } from "../../locale/context";
import type {
  WorkbenchChallengeConfig,
  WorkbenchChallengeResponse,
  WorkbenchImageChallenge,
} from "./model";

export interface WorkbenchRemoteChallengeRenderProps {
  config: WorkbenchChallengeConfig;
  disabled?: boolean;
  onChange(challenge?: WorkbenchChallengeResponse): void;
  onError(message: string): void;
  resetKey: number;
}

export interface WorkbenchChallengeFieldProps {
  config: WorkbenchChallengeConfig;
  createImageChallenge?: () => Promise<WorkbenchImageChallenge>;
  disabled?: boolean;
  renderRemoteChallenge?(props: WorkbenchRemoteChallengeRenderProps): ReactNode;
  resetKey?: number;
  onChange(challenge?: WorkbenchChallengeResponse): void;
  onError?(message: string): void;
}

export function WorkbenchChallengeField({
  config,
  createImageChallenge,
  disabled,
  renderRemoteChallenge,
  resetKey,
  onChange,
  onError,
}: WorkbenchChallengeFieldProps) {
  const { messages } = useWorkbenchLocale();
  const mergedLabels = messages.challenge;
  const resolvedResetKey = resetKey ?? 0;

  const handleError = useCallback((message: string) => {
    onError?.(message);
  }, [onError]);

  if (config.provider !== "image") {
    if (renderRemoteChallenge) {
      return renderRemoteChallenge({
        config,
        disabled,
        onChange,
        onError: handleError,
        resetKey: resolvedResetKey,
      });
    }

    return (
      <div className="wb-security__remote-challenge">
        {config.sitekey
          ? mergedLabels.remoteChallengeUnsupported
          : mergedLabels.remoteChallengeMissingSitekey}
      </div>
    );
  }

  if (!createImageChallenge) {
    return <div className="wb-security__remote-challenge">{mergedLabels.captchaCreateFailed}</div>;
  }

  return (
    <ImageChallengeField
      createImageChallenge={createImageChallenge}
      disabled={disabled}
      labels={mergedLabels}
      onChange={onChange}
      onError={handleError}
      resetKey={resolvedResetKey}
    />
  );
}

interface ImageChallengeFieldProps {
  createImageChallenge(): Promise<WorkbenchImageChallenge>;
  disabled?: boolean;
  labels: Required<WorkbenchChallengeFieldLabels>;
  resetKey: number;
  onChange(challenge?: WorkbenchChallengeResponse): void;
  onError(message: string): void;
}

function ImageChallengeField({
  createImageChallenge,
  disabled,
  labels,
  resetKey,
  onChange,
  onError,
}: ImageChallengeFieldProps) {
  const [challenge, setChallenge] = useState<WorkbenchImageChallenge>();
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setAnswer("");
    onChange(undefined);
    try {
      const next = await createImageChallenge();
      setChallenge(next);
    } catch (error) {
      setChallenge(undefined);
      onError(error instanceof Error ? error.message : labels.captchaCreateFailed);
    } finally {
      setLoading(false);
    }
  }, [createImageChallenge, labels.captchaCreateFailed, onChange, onError]);

  useEffect(() => {
    void refresh();
  }, [refresh, resetKey]);

  useEffect(() => {
    if (!challenge || answer.trim() === "") {
      onChange(undefined);
      return;
    }

    onChange({
      answer,
      challengeId: challenge.challengeId,
      provider: "image",
    });
  }, [answer, challenge, onChange]);

  return (
    <div className="wb-security__captcha-row">
      <Input
        autoComplete="off"
        className="wb-security__captcha-input"
        disabled={disabled || loading}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setAnswer(event.target.value)}
        value={answer}
      />
      <Button
        className="wb-security__captcha-button"
        disabled={disabled || loading}
        htmlType="button"
        aria-label={String(labels.refresh)}
        onClick={() => void refresh()}
      >
        {challenge ? <img alt={String(labels.captcha)} src={challenge.image} /> : null}
        {!challenge ? <ReloadOutlined /> : null}
      </Button>
    </div>
  );
}
