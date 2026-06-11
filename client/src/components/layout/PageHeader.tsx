import { CalendarOutlined } from "@ant-design/icons";

export default function PageHeader() {
  return (
    <div className="dashboard-page-header">
      <div className="dashboard-page-title">
        <div className="dashboard-page-icon">
          <CalendarOutlined className="text-amber-500" />
        </div>
        Leave Management System
      </div>
    </div>
  );
}
