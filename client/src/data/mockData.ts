export const leaveBalances = [
  { type: "Sick", remaining: 8, total: 12, color: "#f5a623" },
  { type: "Casual", remaining: 5, total: 10, color: "#13c2c2" },
  { type: "Annual", remaining: 3, total: 15, color: "#1890ff" },
  { type: "Overtime", remaining: 4, total: 8, color: "#722ed1" },
];

export const teamLeaveData = [
  { month: "Jan", leaves: 12 },
  { month: "Feb", leaves: 8 },
  { month: "Mar", leaves: 15 },
  { month: "Apr", leaves: 10 },
  { month: "May", leaves: 18 },
  { month: "Jun", leaves: 14 },
  { month: "Jul", leaves: 22 },
  { month: "Aug", leaves: 9 },
  { month: "Sep", leaves: 16 },
  { month: "Oct", leaves: 11 },
  { month: "Nov", leaves: 13 },
  { month: "Dec", leaves: 7 },
];

export const calendarLegend = [
  { label: "Sick Leave", color: "#f5a623" },
  { label: "Casual Leave", color: "#13c2c2" },
  { label: "Annual Leave", color: "#1890ff" },
  { label: "Overtime", color: "#722ed1" },
];

export const samplePendingLeaves = [
  {
    id: "sample-1",
    name: "Jessica",
    type: "sick",
    fromDate: "2023-07-15",
    toDate: "2023-07-15",
    status: "pending" as const,
  },
  {
    id: "sample-2",
    name: "Jenny",
    type: "casual",
    fromDate: "2023-07-16",
    toDate: "2023-07-16",
    endDateLabel: "First Half",
    status: "pending" as const,
  },
  {
    id: "sample-3",
    name: "John",
    type: "annual",
    fromDate: "2023-07-18",
    toDate: "2023-07-20",
    status: "pending" as const,
  },
  {
    id: "sample-4",
    name: "Jack",
    type: "overtime",
    fromDate: "2023-07-22",
    toDate: "2023-07-22",
    status: "pending" as const,
  },
];
