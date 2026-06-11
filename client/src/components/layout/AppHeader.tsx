import { Input, Badge, Avatar } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export default function AppHeader() {
  return (
    <header className="dashboard-top-header">
      <div className="dashboard-brand">Work Platform</div>
      <Input
        className="dashboard-search"
        placeholder="Search everything"
        prefix={<SearchOutlined className="text-neutral-400" />}
        size="large"
      />
      <div className="dashboard-header-actions">
        <Badge count="9+" size="small">
          <BellOutlined className="text-lg text-neutral-600" />
        </Badge>
        <QuestionCircleOutlined className="text-lg text-neutral-600" />
        <Avatar
          size={36}
          className="avatar-blue"
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        />
      </div>
    </header>
  );
}
