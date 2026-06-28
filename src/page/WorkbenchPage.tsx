import { Flex, Space, Typography } from "antd";
import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export interface WorkbenchPageProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  description?: ReactNode;
  extra?: ReactNode;
  title?: ReactNode;
  toolbar?: ReactNode;
}

export function WorkbenchPage({
  children,
  className,
  contentClassName,
  description,
  extra,
  title,
  toolbar,
}: WorkbenchPageProps) {
  const hasHeader = title || description || extra || toolbar;

  return (
    <section className={cx("wb-page", className)}>
      {hasHeader ? (
        <Flex className="wb-page__header" align="flex-start" justify="space-between" gap={12}>
          <Space className="wb-page__title-group" orientation="vertical" size={2}>
            {title ? (
              <Typography.Title level={3} className="wb-page__title">
                {title}
              </Typography.Title>
            ) : null}
            {description ? (
              <Typography.Text className="wb-page__description">{description}</Typography.Text>
            ) : null}
          </Space>
          {extra || toolbar ? (
            <Space className="wb-page__actions" size={8} wrap>
              {toolbar}
              {extra}
            </Space>
          ) : null}
        </Flex>
      ) : null}
      <div className={cx("wb-page__content", contentClassName)}>{children}</div>
    </section>
  );
}
