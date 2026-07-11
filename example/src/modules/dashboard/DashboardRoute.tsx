import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  LockOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Alert, Button, Col, Progress, Row, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState, type ReactNode } from "react";
import {
  WorkbenchPage,
  WorkbenchVerificationProvider,
  useWorkbenchVerification,
  WorkbenchPanel,
} from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../shared/i18n";

interface QueueItem {
  key: string;
  owner: string;
  priority: "high" | "normal";
  service: string;
  status: "blocked" | "done" | "running";
}

const queue: QueueItem[] = [
  { key: "OPS-1042", owner: "Ada", priority: "high", service: "Billing", status: "running" },
  { key: "OPS-1043", owner: "Lin", priority: "normal", service: "Identity", status: "done" },
  { key: "OPS-1044", owner: "Mira", priority: "high", service: "Gateway", status: "blocked" },
];

export function DashboardRoute() {
  const text = useExampleText();
  const columns: ColumnsType<QueueItem> = [
    { dataIndex: "key", title: "ID", width: 120 },
    { dataIndex: "service", title: text.dashboard.service },
    { dataIndex: "owner", title: text.dashboard.owner, width: 120 },
    {
      dataIndex: "priority",
      title: text.dashboard.priority,
      width: 120,
      render: (value: QueueItem["priority"]) => (
        <Tag color={value === "high" ? "red" : "blue"}>
          {value === "high" ? text.dashboard.high : text.dashboard.normal}
        </Tag>
      ),
    },
    {
      dataIndex: "status",
      title: text.dashboard.status,
      width: 120,
      render: (value: QueueItem["status"]) => {
        const label =
          value === "done"
            ? text.dashboard.done
            : value === "blocked"
              ? text.dashboard.blocked
              : text.dashboard.inProgress;
        const color = value === "done" ? "green" : value === "blocked" ? "red" : "gold";
        return <Tag color={color}>{label}</Tag>;
      },
    },
  ];

  return (
    <WorkbenchPage
      description={text.dashboard.description}
      extra={<Button type="primary">{text.dashboard.createTask}</Button>}
      title={text.dashboard.title}
    >
      <Row gutter={[12, 12]}>
        <Col xs={24} md={8}>
          <MetricCard icon={<CheckCircleOutlined />} label={text.dashboard.processed} value="128" />
        </Col>
        <Col xs={24} md={8}>
          <MetricCard icon={<ClockCircleOutlined />} label={text.dashboard.inProgress} value="17" />
        </Col>
        <Col xs={24} md={8}>
          <MetricCard icon={<WarningOutlined />} label={text.dashboard.blocked} value="3" />
        </Col>
      </Row>
      <WorkbenchPanel title={text.dashboard.health}>
        <Space className="example-health" orientation="vertical" size={14}>
          <Progress percent={92} status="active" />
          <Progress percent={74} strokeColor="var(--wb-warning)" />
          <Progress percent={38} status="exception" />
        </Space>
      </WorkbenchPanel>
      <WorkbenchPanel title={text.dashboard.queue}>
        <Table columns={columns} dataSource={queue} pagination={false} size="middle" />
      </WorkbenchPanel>
      <WorkbenchVerificationProvider
        onVerify={(values) => {
          if (!/^\d{6}$/.test(values.code ?? "")) {
            throw new Error(String(text.security.verificationLabels.codeInvalid));
          }
        }}
      >
        <SensitiveActionCard />
      </WorkbenchVerificationProvider>
    </WorkbenchPage>
  );
}

function MetricCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <WorkbenchPanel className="example-metric">
      <Space align="center" size={12}>
        <span className="example-metric__icon">{icon}</span>
        <span>
          <Typography.Text type="secondary">{label}</Typography.Text>
          <Typography.Title level={2}>{value}</Typography.Title>
        </span>
      </Space>
    </WorkbenchPanel>
  );
}

function SensitiveActionCard() {
  const text = useExampleText();
  const { verify } = useWorkbenchVerification();
  const [status, setStatus] = useState<"cancelled" | "idle" | "verified">("idle");

  async function handleVerify() {
    const result = await verify({
      description: text.security.sensitiveActionDescription,
      method: "totp",
      purpose: "sensitive-action",
      rememberOption: {
        defaultChecked: true,
        minutes: text.security.verificationRememberMinutes,
      },
      subject: text.dashboard.queue,
      title: text.security.sensitiveAction,
    });

    setStatus(result.status);
  }

  const alert =
    status === "verified" ? (
      <Alert message={text.security.sensitiveActionVerified} showIcon type="success" />
    ) : status === "cancelled" ? (
      <Alert message={text.security.sensitiveActionCancelled} showIcon type="info" />
    ) : null;

  return (
    <WorkbenchPanel
      extra={
        <Button icon={<LockOutlined />} type="primary" onClick={handleVerify}>
          {text.security.sensitiveAction}
        </Button>
      }
      title={text.security.sensitiveActionTitle}
    >
      <Space className="example-sensitive-action" direction="vertical" size={12}>
        <Typography.Text type="secondary">
          {text.security.sensitiveActionDescription}
        </Typography.Text>
        {alert}
      </Space>
    </WorkbenchPanel>
  );
}
