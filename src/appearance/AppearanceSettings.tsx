import { CheckOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Flex, Segmented, Slider, Space, Typography } from "antd";
import type { ReactNode } from "react";
import {
  defaultWorkbenchAppearance,
  workbenchAccentPresets,
  workbenchSurfaceTones,
} from "./defaults";
import type {
  WorkbenchAppearance,
  WorkbenchDensity,
  WorkbenchSurfaceTone,
  WorkbenchThemeMode,
} from "./model";
import { useWorkbenchAppearance } from "./AppearanceProvider";
import { cx } from "../internal/cx";
import { workbenchSchemes } from "../theme/schemes";

export type AppearanceSettingsSection =
  | "accent"
  | "density"
  | "mode"
  | "preview"
  | "radius"
  | "scheme"
  | "surface";

export interface AppearanceSettingsLabels {
  accent?: ReactNode;
  black?: ReactNode;
  compact?: ReactNode;
  comfortable?: ReactNode;
  customAccent?: string;
  dark?: ReactNode;
  deep?: ReactNode;
  density?: ReactNode;
  light?: ReactNode;
  mode?: ReactNode;
  preview?: ReactNode;
  radius?: ReactNode;
  reset?: ReactNode;
  scheme?: ReactNode;
  soft?: ReactNode;
  spacious?: ReactNode;
  surface?: ReactNode;
  system?: ReactNode;
  tinted?: ReactNode;
}

export interface AppearanceSettingsProps {
  className?: string;
  labels?: AppearanceSettingsLabels;
  sections?: AppearanceSettingsSection[];
}

const allSections: AppearanceSettingsSection[] = [
  "mode",
  "scheme",
  "surface",
  "accent",
  "density",
  "radius",
  "preview",
];

export function AppearanceSettings({
  className,
  labels,
  sections = allSections,
}: AppearanceSettingsProps) {
  const { appearance, palette, patchAppearance, resetAppearance, resolvedMode } =
    useWorkbenchAppearance();
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
              { label: labels?.system ?? "跟随系统", value: "system" },
            ]}
            value={appearance.mode}
            onChange={(mode) => patchAppearance({ mode })}
          />
        </AppearanceField>
      ) : null}

      {visibleSections.has("scheme") ? (
        <AppearanceField label={labels?.scheme ?? "方案"}>
          <div className="wb-appearance-settings__schemes">
            {workbenchSchemes.map((scheme) => (
              <button
                key={scheme.name}
                className={cx(
                  "wb-appearance-settings__scheme",
                  scheme.name === appearance.scheme &&
                    "wb-appearance-settings__scheme--active",
                )}
                type="button"
                onClick={() => patchAppearance({ scheme: scheme.name })}
              >
                <span className="wb-appearance-settings__scheme-name">{scheme.label}</span>
                <span className="wb-appearance-settings__scheme-strip">
                  <span style={{ background: scheme[resolvedMode].bg }} />
                  <span style={{ background: scheme[resolvedMode].sidebar }} />
                  <span style={{ background: scheme[resolvedMode].panel }} />
                </span>
              </button>
            ))}
          </div>
        </AppearanceField>
      ) : null}

      {visibleSections.has("surface") ? (
        <AppearanceField label={labels?.surface ?? "底色"}>
          <Segmented<WorkbenchSurfaceTone>
            block
            options={workbenchSurfaceTones.map((surface) => ({
              label: surfaceLabel(surface.name, labels),
              value: surface.name,
            }))}
            value={appearance.surface}
            onChange={(surface) => patchAppearance({ surface })}
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
              { label: labels?.spacious ?? "宽松", value: "spacious" },
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

      {visibleSections.has("preview") ? (
        <AppearanceField label={labels?.preview ?? "预览"}>
          <div className="wb-appearance-settings__preview">
            <div className="wb-appearance-settings__preview-sidebar">
              <span />
              <span className="wb-appearance-settings__preview-active" />
              <span />
            </div>
            <div className="wb-appearance-settings__preview-main">
              <div className="wb-appearance-settings__preview-row">
                <Button size="small" type="primary">
                  Button
                </Button>
                <span className="wb-appearance-settings__preview-input">Input</span>
              </div>
              <div className="wb-appearance-settings__preview-table">
                <span style={{ background: palette.panel }} />
                <span />
                <span />
              </div>
            </div>
          </div>
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

function surfaceLabel(
  surface: WorkbenchSurfaceTone,
  labels?: AppearanceSettingsLabels,
): ReactNode {
  if (surface === "black") {
    return labels?.black ?? "黑";
  }
  if (surface === "soft") {
    return labels?.soft ?? "柔";
  }
  if (surface === "tinted") {
    return labels?.tinted ?? "染";
  }
  return labels?.deep ?? "深";
}

export type { WorkbenchAppearance };
export { defaultWorkbenchAppearance };

