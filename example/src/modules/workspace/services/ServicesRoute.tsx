import { DatabaseOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Space, Tag, Typography } from "antd";
import Card from "antd/es/card/Card";
import { WorkbenchPage, WorkbenchSplitWorkspace } from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";

const services = ["Identity", "Billing", "Gateway", "Console", "Scheduler"];

export function ServicesRoute() {
  const text = useExampleText();
  const cards = [
    text.workspace.events,
    text.workspace.configurationChanges,
    text.workspace.accessPolicy,
    text.workspace.capacity,
  ];

  return (
    <WorkbenchPage
      description={text.workspace.servicesDescription}
      title={text.workspace.services}
    >
      <WorkbenchSplitWorkspace
        sidebar={
          <div className="example-sidebar">
            <Input prefix={<SearchOutlined />} placeholder={text.workspace.searchServices} />
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
        <div className="example-workspace-grid">
          {cards.map((title, index) => (
            <Card key={title} className="example-panel" title={title}>
              <Typography.Paragraph>
                {index % 2 === 0
                  ? text.workspace.stableServiceCopy
                  : text.workspace.changeQueue}
              </Typography.Paragraph>
              <Tag color={index === 1 ? "gold" : "green"}>
                {index === 1 ? text.workspace.pending : text.workspace.healthy}
              </Tag>
            </Card>
          ))}
        </div>
      </WorkbenchSplitWorkspace>
    </WorkbenchPage>
  );
}
