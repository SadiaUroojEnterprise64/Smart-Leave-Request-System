import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  MessageOutlined,
  TeamOutlined,
  FlagOutlined,
  BugOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const menuItems = [
  { key: "home", icon: <HomeOutlined /> },
  { key: "grid", icon: <AppstoreOutlined /> },
  { key: "message", icon: <MessageOutlined /> },
  { key: "team", icon: <TeamOutlined /> },
  { key: "flag", icon: <FlagOutlined /> },
  { key: "bug", icon: <BugOutlined /> },
  { key: "chart", icon: <BarChartOutlined /> },
  { key: "clock", icon: <ClockCircleOutlined /> },
  { key: "calendar", icon: <CalendarOutlined /> },
  { key: "inbox", icon: <InboxOutlined /> },
];

export default function AppSidebar() {
  return (
    <Sider
      className="dashboard-sidebar"
      width={64}
      collapsed
      collapsedWidth={64}
      trigger={null}
    >
      <Menu
        mode="inline"
        selectedKeys={["home"]}
        items={menuItems.map((item) => ({
          key: item.key,
          icon: item.icon,
        }))}
      />
    </Sider>
  );
}
