import Card from "antd/es/card/Card";
import {
  WorkbenchAppearanceSettings,
  WorkbenchPage,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";

export function AppearanceRoute() {
  const text = useExampleText();

  return (
    <WorkbenchPage
      description={text.settings.appearanceDescription}
      title={text.settings.appearance}
    >
      <Card className="example-panel" title={text.settings.appearanceCard}>
        <WorkbenchAppearanceSettings labels={text.settings.appearanceLabels} />
      </Card>
    </WorkbenchPage>
  );
}
