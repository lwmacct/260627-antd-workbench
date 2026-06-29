import { GlobalOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import type { ReactNode } from "react";
import { useWorkbenchLocale } from "../../locale/context";
import type { WorkbenchLocaleOption } from "../../locale/model";

export interface WorkbenchLanguageToggleLabels {
  switchLanguage?: ReactNode;
}

export interface WorkbenchLanguageToggleProps {
  iconOnly?: boolean;
  labels?: WorkbenchLanguageToggleLabels;
  options?: WorkbenchLocaleOption[];
}

export function WorkbenchLanguageToggle({
  iconOnly = false,
  labels,
  options: localOptions,
}: WorkbenchLanguageToggleProps) {
  const { locale, options: contextOptions, setLocale, toggleLocale } = useWorkbenchLocale();
  const options = localOptions ?? contextOptions;
  const current = options.find((option) => option.value === locale);
  const title = labels?.switchLanguage ?? "切换语言";

  function handleClick() {
    if (options.length > 0) {
      const currentIndex = Math.max(
        0,
        options.findIndex((option) => option.value === locale),
      );
      const next = options[(currentIndex + 1) % options.length];
      setLocale(next.value);
      return;
    }

    toggleLocale();
  }

  return (
    <Tooltip title={title}>
      <Button
        aria-label={typeof title === "string" ? title : "切换语言"}
        icon={<GlobalOutlined />}
        shape={iconOnly ? "circle" : undefined}
        type="text"
        onClick={handleClick}
      >
        {iconOnly ? null : current?.shortLabel ?? current?.label ?? locale}
      </Button>
    </Tooltip>
  );
}

