import { useState } from "react";
import { Calendar, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { calendarLegend } from "../../data/mockData";

const leaveMarkers: Record<string, string[]> = {
  "2023-07-03": ["#f5a623"],
  "2023-07-05": ["#13c2c2", "#1890ff"],
  "2023-07-10": ["#f5a623"],
  "2023-07-12": ["#722ed1"],
  "2023-07-15": ["#eb2f96"],
  "2023-07-18": ["#1890ff"],
  "2023-07-22": ["#f5222d"],
  "2023-07-25": ["#13c2c2"],
  "2023-07-28": ["#f5a623", "#eb2f96"],
};

export default function LeaveCalendarSection() {
  const [value, setValue] = useState<Dayjs>(dayjs("2023-07-01"));

  const cellRender = (date: Dayjs) => {
    const key = date.format("YYYY-MM-DD");
    const markers = leaveMarkers[key];
    if (!markers) return null;

    return (
      <div className="calendar-cell-dots">
        {markers.map((color, i) => (
          <span
            key={i}
            className="calendar-cell-marker"
            style={{ background: color }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-card">
      <div className="calendar-header">
        <h3 className="dashboard-card-title calendar-title">Leave Calendar</h3>
        <div className="calendar-nav">
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={() => setValue(value.subtract(1, "month"))}
          />
          <span className="calendar-month">{value.format("MMMM YYYY")}</span>
          <Button
            type="text"
            icon={<RightOutlined />}
            onClick={() => setValue(value.add(1, "month"))}
          />
        </div>
      </div>

      <div className="calendar-legend">
        {calendarLegend.map((item) => (
          <div key={item.label} className="calendar-legend-item">
            <span
              className="calendar-legend-dot"
              style={{ background: item.color }}
            />
            {item.label}
          </div>
        ))}
      </div>

      <Calendar
        value={value}
        onChange={setValue}
        fullscreen={false}
        headerRender={() => null}
        cellRender={(current) => cellRender(current)}
      />
    </div>
  );
}
