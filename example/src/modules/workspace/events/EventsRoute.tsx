import { Timeline } from "antd";
import Card from "antd/es/card/Card";
import { WorkbenchPage } from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";

export function EventsRoute() {
  const text = useExampleText();

  return (
    <WorkbenchPage description={text.workspace.eventsDescription} title={text.workspace.events}>
      <Card className="example-panel">
        <Timeline
          items={[
            { color: "green", content: text.workspace.eventItems[0] },
            { color: "blue", content: text.workspace.eventItems[1] },
            { color: "gold", content: text.workspace.eventItems[2] },
          ]}
        />
      </Card>
    </WorkbenchPage>
  );
}
