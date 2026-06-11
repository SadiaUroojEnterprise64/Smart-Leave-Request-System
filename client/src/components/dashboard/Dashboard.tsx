import LeaveAvailability from "./LeaveAvailability";
import LeaveApprovalTable from "./LeaveApprovalTable";
import TeamLeaveChart from "./TeamLeaveChart";
import LeaveCalendarSection from "./LeaveCalendarSection";

export default function Dashboard() {
  return (
    <div className="dashboard-content">
      <LeaveAvailability />

      <div className="dashboard-row">
        <LeaveApprovalTable />
        <TeamLeaveChart />
      </div>

      <LeaveCalendarSection />
    </div>
  );
}
