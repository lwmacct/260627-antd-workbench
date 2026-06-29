import { Card, Progress, Space } from "antd";
import { WorkbenchPage } from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";

export function CapacityRoute() {
  const text = useExampleText();

  return (
    <WorkbenchPage
      description={text.workspace.capacityDescription}
      title={text.workspace.capacity}
    >
      <Card className="example-panel" title={text.workspace.capacityUsage}>
        <Space className="example-health" orientation="vertical" size={14}>
          <Progress percent={68} />
          <Progress percent={82} strokeColor="var(--wb-warning)" />
          <Progress percent={36} />
        </Space>
      </Card>
    </WorkbenchPage>
  );
}
