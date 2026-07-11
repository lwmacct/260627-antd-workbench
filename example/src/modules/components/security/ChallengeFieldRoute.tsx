import { Alert, Button, Col, Row, Space, Typography } from "antd";
import { useState } from "react";
import {
  WorkbenchHumanChallengeField,
  WorkbenchPage,
  type WorkbenchHumanChallengeResponse,
  WorkbenchPanel,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";
import { createExampleImageChallenge } from "./demo";

export function ChallengeFieldRoute() {
  const text = useExampleText();
  const [challenge, setChallenge] = useState<WorkbenchHumanChallengeResponse>();
  const [challengeError, setChallengeError] = useState("");

  return (
    <WorkbenchPage
      description={text.components.challengeFieldDescription}
      title={text.components.challengeField}
    >
      <Row gutter={[12, 12]}>
        <Col xs={24} lg={12}>
          <WorkbenchPanel title={text.components.imageChallenge}>
            <Space className="example-components-actions" orientation="vertical" size={10}>
              <WorkbenchHumanChallengeField
                config={{ provider: "image" }}
                createImageChallenge={createExampleImageChallenge}
                onChange={setChallenge}
                onError={setChallengeError}
              />
              {challenge ? (
                <Typography.Text type="secondary">
                  {text.components.challengeReady}
                </Typography.Text>
              ) : null}
              {challengeError ? <Alert message={challengeError} showIcon type="error" /> : null}
            </Space>
          </WorkbenchPanel>
        </Col>
        <Col xs={24} lg={12}>
          <WorkbenchPanel title={text.components.remoteChallenge}>
            <WorkbenchHumanChallengeField
              config={{ provider: "turnstile", sitekey: "example-site-key" }}
              onChange={setChallenge}
              onError={setChallengeError}
              renderRemoteChallenge={({ config, onChange }) => (
                <Space className="example-remote-challenge" orientation="vertical" size={10}>
                  <Typography.Text type="secondary">
                    {text.components.remoteChallengeAdapter(config.provider)}
                  </Typography.Text>
                  <Button
                    onClick={() =>
                      onChange({
                        provider: config.provider,
                        token: "example-token",
                      } as WorkbenchHumanChallengeResponse)
                    }
                  >
                    {text.components.resolveRemoteChallenge}
                  </Button>
                </Space>
              )}
            />
          </WorkbenchPanel>
        </Col>
      </Row>
    </WorkbenchPage>
  );
}
