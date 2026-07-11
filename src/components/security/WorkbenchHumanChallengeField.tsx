import { ReloadOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useCallback, useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import type { WorkbenchMessages } from "../../locale/model";
import type { WorkbenchHumanChallengeConfig, WorkbenchHumanChallengeResponse, WorkbenchImageChallenge } from "./model";

export interface WorkbenchRemoteHumanChallengeRenderProps {
  config: WorkbenchHumanChallengeConfig;
  disabled?: boolean;
  onChange(challenge?: WorkbenchHumanChallengeResponse): void;
  onError(message: string): void;
  resetKey: number;
}

export interface WorkbenchHumanChallengeFieldProps {
  config: WorkbenchHumanChallengeConfig;
  createImageChallenge?: () => Promise<WorkbenchImageChallenge>;
  disabled?: boolean;
  renderRemoteChallenge?(props: WorkbenchRemoteHumanChallengeRenderProps): ReactNode;
  resetKey?: number;
  onChange(challenge?: WorkbenchHumanChallengeResponse): void;
  onError?(message: string): void;
}

export function WorkbenchHumanChallengeField(props: WorkbenchHumanChallengeFieldProps) {
  const { messages } = useWorkbenchLocale();
  const resetKey = props.resetKey ?? 0;
  const handleError = useCallback((message: string) => props.onError?.(message), [props.onError]);
  if (props.config.provider !== "image") {
    if (props.renderRemoteChallenge) return props.renderRemoteChallenge({ config: props.config, disabled: props.disabled, onChange: props.onChange, onError: handleError, resetKey });
    return <div className="wb-security__remote-challenge">{props.config.sitekey ? messages.humanChallenge.unsupportedRemoteProvider : messages.humanChallenge.missingSitekey}</div>;
  }
  if (!props.createImageChallenge) return <div className="wb-security__remote-challenge">{messages.humanChallenge.createFailed}</div>;
  return <ImageChallengeField createImageChallenge={props.createImageChallenge} disabled={props.disabled} labels={messages.humanChallenge} resetKey={resetKey} onChange={props.onChange} onError={handleError} />;
}

function ImageChallengeField({ createImageChallenge, disabled, labels, resetKey, onChange, onError }: {
  createImageChallenge(): Promise<WorkbenchImageChallenge>;
  disabled?: boolean;
  labels: WorkbenchMessages["humanChallenge"];
  resetKey: number;
  onChange(challenge?: WorkbenchHumanChallengeResponse): void;
  onError(message: string): void;
}) {
  const [challenge, setChallenge] = useState<WorkbenchImageChallenge>();
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const refresh = useCallback(async () => {
    setLoading(true); setAnswer(""); onChange(undefined);
    try { setChallenge(await createImageChallenge()); } catch (error) { setChallenge(undefined); onError(error instanceof Error ? error.message : labels.createFailed); } finally { setLoading(false); }
  }, [createImageChallenge, labels.createFailed, onChange, onError]);
  useEffect(() => { void refresh(); }, [refresh, resetKey]);
  useEffect(() => { onChange(challenge && answer.trim() ? { answer, challengeId: challenge.challengeId, provider: "image" } : undefined); }, [answer, challenge, onChange]);
  return <div className="wb-security__captcha-row">
    <Input autoComplete="off" className="wb-security__captcha-input" disabled={disabled || loading} value={answer} onChange={(event: ChangeEvent<HTMLInputElement>) => setAnswer(event.target.value)} />
    <Button aria-label={String(labels.refresh)} className="wb-security__captcha-button" disabled={disabled || loading} htmlType="button" onClick={() => void refresh()}>
      {challenge ? <img alt={String(labels.imageAlt)} src={challenge.image} /> : <ReloadOutlined />}
    </Button>
  </div>;
}
