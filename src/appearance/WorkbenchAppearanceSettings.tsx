import { CheckOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Flex, Segmented, Slider, Space, Typography } from "antd";
import type { ReactNode } from "react";
import {
  useWorkbenchAppearance,
  type WorkbenchAppearance,
} from "../provider/WorkbenchProvider";
import {
  defaultWorkbenchAppearance,
  workbenchAccentPresets,
  type WorkbenchDensity,
  type WorkbenchThemeMode,
} from "../provider/theme";
import { cx } from "../utils/cx";

export type WorkbenchAppearanceSettingsSection =
  | "accent"
  | "density"
  | "mode"
  | "radius";

export interface WorkbenchAppearanceSettingsLabels {
  accent?: ReactNode;
  compact?: ReactNode;
  comfortable?: ReactNode;
  customAccent?: string;
  dark?: ReactNode;
  density?: ReactNode;
  light?: ReactNode;
  mode?: ReactNode;
  radius?: ReactNode;
  reset?: ReactNode;
}

export interface WorkbenchAppearanceSettingsProps {
  className?: string;
  labels?: WorkbenchAppearanceSettingsLabels;
  sections?: WorkbenchAppearanceSettingsSection[];
}

const allSections: WorkbenchAppearanceSettingsSection[] = [
  "mode",
  "accent",
  "density",
  "radius",
];

export function WorkbenchAppearanceSettings({
  className,
  labels,
  sections = allSections,
}: WorkbenchAppearanceSettingsProps) {
  const { appearance, patchAppearance, resetAppearance } = useWorkbenchAppearance();
  const visibleSections = new Set(sections);

  return (
    <div className={cx("wb-appearance-settings", className)}>
      {visibleSections.has("mode") ? (
        <AppearanceField label={labels?.mode ?? "主题"}>
          <Segmented<WorkbenchThemeMode>
            block
            options={[
              { label: labels?.dark ?? "深色", value: "dark" },
              { label: labels?.light ?? "浅色", value: "light" },
            ]}
            value={appearance.mode}
            onChange={(mode) => patchAppearance({ mode })}
          />
        </AppearanceField>
      ) : null}

      {visibleSections.has("accent") ? (
        <AppearanceField label={labels?.accent ?? "主色"}>
          <Space className="wb-appearance-settings__swatches" size={8} wrap>
            {workbenchAccentPresets.map((preset) => (
              <button
                key={preset.value}
                aria-label={preset.label}
                className={cx(
                  "wb-appearance-settings__swatch",
                  preset.value === appearance.accent &&
                    "wb-appearance-settings__swatch--active",
                )}
                style={{ background: preset.value }}
                type="button"
                onClick={() => patchAppearance({ accent: preset.value })}
              >
                {preset.value === appearance.accent ? <CheckOutlined /> : null}
              </button>
            ))}
            <label className="wb-appearance-settings__color">
              <input
                aria-label={labels?.customAccent ?? "自定义主色"}
                type="color"
                value={appearance.accent}
                onChange={(event) => patchAppearance({ accent: event.target.value })}
              />
            </label>
          </Space>
        </AppearanceField>
      ) : null}

      {visibleSections.has("density") ? (
        <AppearanceField label={labels?.density ?? "密度"}>
          <Segmented<WorkbenchDensity>
            block
            options={[
              { label: labels?.comfortable ?? "舒适", value: "comfortable" },
              { label: labels?.compact ?? "紧凑", value: "compact" },
            ]}
            value={appearance.density}
            onChange={(density) => patchAppearance({ density })}
          />
        </AppearanceField>
      ) : null}

      {visibleSections.has("radius") ? (
        <AppearanceField label={labels?.radius ?? "圆角"}>
          <Flex align="center" gap={12}>
            <Slider
              className="wb-appearance-settings__radius"
              max={12}
              min={0}
              value={appearance.radius}
              onChange={(radius) => patchAppearance({ radius })}
            />
            <Typography.Text className="wb-appearance-settings__radius-value">
              {appearance.radius}px
            </Typography.Text>
          </Flex>
        </AppearanceField>
      ) : null}

      <Flex justify="flex-end">
        <Button icon={<ReloadOutlined />} onClick={resetAppearance}>
          {labels?.reset ?? "重置"}
        </Button>
      </Flex>
    </div>
  );
}

function AppearanceField({
  children,
  label,
}: {
  children: ReactNode;
  label: ReactNode;
}) {
  return (
    <div className="wb-appearance-settings__field">
      <Typography.Text className="wb-appearance-settings__label" strong>
        {label}
      </Typography.Text>
      <div className="wb-appearance-settings__control">{children}</div>
    </div>
  );
}

export type { WorkbenchAppearance };
export { defaultWorkbenchAppearance };
