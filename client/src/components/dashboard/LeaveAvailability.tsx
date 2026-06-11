import { useState } from "react";
import { Button, Progress } from "antd";
import { leaveBalances } from "../../data/mockData";
import ApplyLeaveModal from "../ApplyLeaveModal";

export default function LeaveAvailability() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">Leave Availability</h3>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Apply Leave
        </Button>
      </div>

      <div className="leave-balance-track">
        {leaveBalances.map((item) => {
          const percent = Math.round((item.remaining / item.total) * 100);
          return (
            <div key={item.type} className="leave-balance-card">
              <div className="leave-balance-label">Total</div>
              <div className="leave-balance-type">{item.type}</div>
              <Progress
                type="circle"
                percent={percent}
                size={90}
                strokeColor={item.color}
                format={() => item.remaining}
                className="leave-balance-progress"
              />
            </div>
          );
        })}
      </div>

      <ApplyLeaveModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
