import { Column } from "@ant-design/charts";
import { teamLeaveData } from "../../data/mockData";

export default function TeamLeaveChart() {
  const config = {
    data: teamLeaveData,
    xField: "month",
    yField: "leaves",
    color: "#1890ff",
    columnStyle: { radius: [4, 4, 0, 0] },
    label: false,
    axis: {
      y: { title: false },
      x: { title: false },
    },
    height: 280,
    style: { maxWidth: 28 },
  };

  return (
    <div className="dashboard-card dashboard-card--flush">
      <h3 className="dashboard-card-title">Team Leave Track</h3>
      <div className="chart-subtitle">July, 2023</div>
      <Column {...config} />
    </div>
  );
}
