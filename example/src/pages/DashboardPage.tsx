import { CheckCircleOutlined, ClockCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Button, Card, Col, Progress, Row, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ReactNode } from "react";
import { WorkbenchPage } from "@lwmacct/260627-antd-workbench";

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

const columns: ColumnsType<QueueItem> = [
  { dataIndex: "key", title: "编号", width: 120 },
  { dataIndex: "service", title: "服务" },
  { dataIndex: "owner", title: "负责人", width: 120 },
  {
    dataIndex: "priority",
    title: "优先级",
    width: 120,
    render: (value: QueueItem["priority"]) => (
      <Tag color={value === "high" ? "red" : "blue"}>{value === "high" ? "高" : "普通"}</Tag>
    ),
  },
  {
    dataIndex: "status",
    title: "状态",
    width: 120,
    render: (value: QueueItem["status"]) => {
      const label = value === "done" ? "完成" : value === "blocked" ? "阻塞" : "运行中";
      const color = value === "done" ? "green" : value === "blocked" ? "red" : "gold";
      return <Tag color={color}>{label}</Tag>;
    },
  },
];

export function DashboardPage() {
  return (
    <WorkbenchPage
      description="今日运营队列和关键指标。"
      extra={<Button type="primary">新建任务</Button>}
      title="总览"
    >
      <Row gutter={[12, 12]}>
        <Col xs={24} md={8}>
          <MetricCard icon={<CheckCircleOutlined />} label="已处理" value="128" />
        </Col>
        <Col xs={24} md={8}>
          <MetricCard icon={<ClockCircleOutlined />} label="进行中" value="17" />
        </Col>
        <Col xs={24} md={8}>
          <MetricCard icon={<WarningOutlined />} label="阻塞" value="3" />
        </Col>
      </Row>
      <Card className="example-panel" title="服务健康度">
        <Space className="example-health" orientation="vertical" size={14}>
          <Progress percent={92} status="active" />
          <Progress percent={74} strokeColor="var(--wb-warning)" />
          <Progress percent={38} status="exception" />
        </Space>
      </Card>
      <Card className="example-panel" title="处理队列">
        <Table columns={columns} dataSource={queue} pagination={false} size="middle" />
      </Card>
    </WorkbenchPage>
  );
}

function MetricCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <Card className="example-metric">
      <Space align="center" size={12}>
        <span className="example-metric__icon">{icon}</span>
        <span>
          <Typography.Text type="secondary">{label}</Typography.Text>
          <Typography.Title level={2}>{value}</Typography.Title>
        </span>
      </Space>
    </Card>
  );
}
