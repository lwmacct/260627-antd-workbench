import { DatabaseOutlined, DeploymentUnitOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, Space, Tag, Typography } from "antd";
import { WorkbenchPage, WorkbenchSplitWorkspace } from "@lwmacct/260627-antd-workbench";

const services = ["Identity", "Billing", "Gateway", "Console", "Scheduler"];

export function WorkspacePage() {
  return (
    <WorkbenchSplitWorkspace
      sidebar={
        <div className="example-sidebar">
          <Input prefix={<SearchOutlined />} placeholder="搜索服务" />
          <div className="example-sidebar__list">
            {services.map((service, index) => (
              <button
                key={service}
                className={index === 1 ? "example-sidebar__active" : undefined}
                type="button"
              >
                <Space>
                  <DatabaseOutlined />
                  <span>{service}</span>
                </Space>
              </button>
            ))}
          </div>
        </div>
      }
      sidebarWidth={260}
    >
      <WorkbenchPage
        description="面向复杂业务页面的侧栏加工作区布局。"
        extra={<Button icon={<DeploymentUnitOutlined />}>部署</Button>}
        title="工作区"
      >
        <div className="example-workspace-grid">
          {["实时事件", "配置变更", "访问策略", "容量计划"].map((title, index) => (
            <Card key={title} className="example-panel" title={title}>
              <Typography.Paragraph>
                {index % 2 === 0
                  ? "当前服务运行稳定，最近 24 小时无高危告警。"
                  : "等待审批的变更会在这里形成业务队列。"}
              </Typography.Paragraph>
              <Tag color={index === 1 ? "gold" : "green"}>{index === 1 ? "待处理" : "正常"}</Tag>
            </Card>
          ))}
        </div>
      </WorkbenchPage>
    </WorkbenchSplitWorkspace>
  );
}
