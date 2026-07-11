import {
  WorkbenchAppearanceSettings,
  WorkbenchPage,
  WorkbenchPanel,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";

export function AppearanceRoute() {
  const text = useExampleText();

  return (
    <WorkbenchPage
      description={text.settings.appearanceDescription}
      title={text.settings.appearance}
    >
      <WorkbenchPanel title={text.settings.appearanceCard}>
        <WorkbenchAppearanceSettings />
      </WorkbenchPanel>
    </WorkbenchPage>
  );
}
