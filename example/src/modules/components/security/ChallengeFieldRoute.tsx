import { Alert, Button, Col, Row, Space, Typography } from "antd";
import Card from "antd/es/card/Card";
import { useState } from "react";
import {
  WorkbenchChallengeField,
  WorkbenchPage,
  type WorkbenchChallengeResponse,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";
import { createExampleImageChallenge } from "./demo";

export function ChallengeFieldRoute() {
  const text = useExampleText();
  const [challenge, setChallenge] = useState<WorkbenchChallengeResponse>();
  const [challengeError, setChallengeError] = useState("");

  return (
    <WorkbenchPage
      description={text.components.challengeFieldDescription}
      title={text.components.challengeField}
    >
      <Row gutter={[12, 12]}>
        <Col xs={24} lg={12}>
          <Card className="example-panel" title={text.components.imageChallenge}>
            <Space className="example-components-actions" direction="vertical" size={10}>
              <WorkbenchChallengeField
                config={{ provider: "image" }}
                createImageChallenge={createExampleImageChallenge}
                labels={text.security.credentialLabels.challenge}
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
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="example-panel" title={text.components.remoteChallenge}>
            <WorkbenchChallengeField
              config={{ provider: "turnstile", sitekey: "example-site-key" }}
              labels={text.security.credentialLabels.challenge}
              onChange={setChallenge}
              onError={setChallengeError}
              renderRemoteChallenge={({ config, onChange }) => (
                <Space className="example-remote-challenge" direction="vertical" size={10}>
                  <Typography.Text type="secondary">
                    {text.components.remoteChallengeAdapter(config.provider)}
                  </Typography.Text>
                  <Button
                    onClick={() =>
                      onChange({
                        provider: config.provider,
                        token: "example-token",
                      } as WorkbenchChallengeResponse)
                    }
                  >
                    {text.components.resolveRemoteChallenge}
                  </Button>
                </Space>
              )}
            />
          </Card>
        </Col>
      </Row>
    </WorkbenchPage>
  );
}
