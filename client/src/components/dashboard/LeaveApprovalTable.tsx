import { Table, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useLeaveStore } from "../../store/useLeaveStore";
import type { Leave } from "../../store/useLeaveStore";
import { samplePendingLeaves } from "../../data/mockData";

type DisplayLeave = Leave & { endDateLabel?: string };

function formatDate(date: string) {
  return dayjs(date).format("D MMMM YYYY");
}

function formatType(type: string) {
  const labels: Record<string, string> = {
    sick: "Sick Leave",
    casual: "Casual Leave",
    annual: "Annual Leave",
    overtime: "Overtime",
  };
  return labels[type] ?? `${type.charAt(0).toUpperCase()}${type.slice(1)} Leave`;
}

function StatusTag({ status }: { status: Leave["status"] }) {
  const className =
    status === "approved"
      ? "status-approved"
      : status === "rejected"
      ? "status-rejected"
      : "status-pending";

  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <span className={className}>{label}</span>;
}

function ActionButtons({
  record,
  onApprove,
  onReject,
}: {
  record: Leave;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const showApprove = record.status !== "approved";
  const showReject = record.status !== "rejected";

  if (!showApprove && !showReject) return null;

  return (
    <div className="action-buttons">
      {showApprove && (
        <Button
          size="small"
          className="action-btn-approve"
          icon={<CheckOutlined />}
          onClick={() => onApprove(record.id)}
        />
      )}
      {showReject && (
        <Button
          size="small"
          className="action-btn-reject"
          icon={<CloseOutlined />}
          onClick={() => onReject(record.id)}
        />
      )}
    </div>
  );
}

export default function LeaveApprovalTable() {
  const { leaves, updateStatus } = useLeaveStore();

  const apiLeaves = leaves.map((leave) => ({
    ...leave,
    name: leave.name ?? "Employee",
  }));

  const displayLeaves: DisplayLeave[] =
    apiLeaves.length > 0 ? apiLeaves : samplePendingLeaves;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Leave Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => formatType(type),
    },
    {
      title: "Start Date",
      dataIndex: "fromDate",
      key: "fromDate",
      render: (date: string) => formatDate(date),
    },
    {
      title: "End Date",
      dataIndex: "toDate",
      key: "toDate",
      render: (date: string, record: DisplayLeave) =>
        record.endDateLabel ?? formatDate(date),
    },
    {
      title: "Status",
      key: "status",
      render: (_: unknown, record: Leave) => (
        <StatusTag status={record.status} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Leave) => (
        <ActionButtons
          record={record}
          onApprove={(id) => updateStatus(id, "approved")}
          onReject={(id) => updateStatus(id, "rejected")}
        />
      ),
    },
  ];

  return (
    <div className="dashboard-card dashboard-card--flush">
      <h3 className="dashboard-card-title dashboard-card-title--spaced">
        Leave Approval
      </h3>
      <Table
        className="approval-table"
        rowKey="id"
        dataSource={displayLeaves}
        columns={columns}
        pagination={false}
        size="middle"
      />
    </div>
  );
}
