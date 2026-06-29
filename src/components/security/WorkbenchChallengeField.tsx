import { ReloadOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { WorkbenchCredentialLabels } from "./labels";
import { defaultWorkbenchCredentialLabels } from "./labels";
import type {
  WorkbenchCredentialChallengeConfig,
  WorkbenchCredentialChallengeResponse,
  WorkbenchImageChallenge,
} from "./model";

export interface WorkbenchRemoteChallengeRenderProps {
  config: WorkbenchCredentialChallengeConfig;
  disabled?: boolean;
  onChange(challenge?: WorkbenchCredentialChallengeResponse): void;
  onError(message: string): void;
  resetKey: number;
}

export interface WorkbenchChallengeFieldProps {
  config: WorkbenchCredentialChallengeConfig;
  createImageChallenge(): Promise<WorkbenchImageChallenge>;
  disabled?: boolean;
  labels?: WorkbenchCredentialLabels;
  renderRemoteChallenge?(props: WorkbenchRemoteChallengeRenderProps): ReactNode;
  resetKey: number;
  onChange(challenge?: WorkbenchCredentialChallengeResponse): void;
  onError(message: string): void;
}

export function WorkbenchChallengeField({
  config,
  createImageChallenge,
  disabled,
  labels,
  renderRemoteChallenge,
  resetKey,
  onChange,
  onError,
}: WorkbenchChallengeFieldProps) {
  const mergedLabels = { ...defaultWorkbenchCredentialLabels, ...labels };

  if (config.provider !== "image") {
    if (renderRemoteChallenge) {
      return renderRemoteChallenge({
        config,
        disabled,
        onChange,
        onError,
        resetKey,
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

  return (
    <ImageChallengeField
      createImageChallenge={createImageChallenge}
      disabled={disabled}
      labels={mergedLabels}
      onChange={onChange}
      onError={onError}
      resetKey={resetKey}
    />
  );
}

interface ImageChallengeFieldProps {
  createImageChallenge(): Promise<WorkbenchImageChallenge>;
  disabled?: boolean;
  labels: Required<WorkbenchCredentialLabels>;
  resetKey: number;
  onChange(challenge?: WorkbenchCredentialChallengeResponse): void;
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
        onChange={(event) => setAnswer(event.target.value)}
        value={answer}
      />
      <Button
        className="wb-security__captcha-button"
        disabled={disabled || loading}
        htmlType="button"
        onClick={() => void refresh()}
      >
        {challenge ? <img alt={String(labels.captcha)} src={challenge.image} /> : null}
        {!challenge ? <ReloadOutlined /> : null}
      </Button>
    </div>
  );
}
