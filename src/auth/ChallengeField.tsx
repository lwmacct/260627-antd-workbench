import { ReloadOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { WorkbenchAuthLabels } from "./labels";
import { defaultWorkbenchAuthLabels } from "./labels";
import type {
  WorkbenchAuthChallengeConfig,
  WorkbenchAuthChallengeResponse,
  WorkbenchImageChallenge,
} from "./model";

export interface WorkbenchRemoteChallengeRenderProps {
  config: WorkbenchAuthChallengeConfig;
  disabled?: boolean;
  onChange(challenge?: WorkbenchAuthChallengeResponse): void;
  onError(message: string): void;
  resetKey: number;
}

export interface WorkbenchChallengeFieldProps {
  config: WorkbenchAuthChallengeConfig;
  createImageChallenge(): Promise<WorkbenchImageChallenge>;
  disabled?: boolean;
  labels?: WorkbenchAuthLabels;
  renderRemoteChallenge?(props: WorkbenchRemoteChallengeRenderProps): ReactNode;
  resetKey: number;
  onChange(challenge?: WorkbenchAuthChallengeResponse): void;
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
  const mergedLabels = { ...defaultWorkbenchAuthLabels, ...labels };

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
      <div className="wb-auth__remote-challenge">
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
  labels: Required<WorkbenchAuthLabels>;
  resetKey: number;
  onChange(challenge?: WorkbenchAuthChallengeResponse): void;
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
    <div className="wb-auth__captcha-row">
      <Input
        autoComplete="off"
        className="wb-auth__captcha-input"
        disabled={disabled || loading}
        onChange={(event) => setAnswer(event.target.value)}
        value={answer}
      />
      <Button
        className="wb-auth__captcha-button"
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
