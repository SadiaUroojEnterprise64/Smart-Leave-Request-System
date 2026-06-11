import { z } from "zod";

export const LEAVE_TYPES = ["sick", "casual", "annual", "overtime"] as const;
export type LeaveType = (typeof LEAVE_TYPES)[number];

export const leaveSchema = z
  .object({
    type: z.enum(LEAVE_TYPES),
    fromDate: z.string(),
    toDate: z.string(),
  })
  .refine((data) => data.toDate >= data.fromDate, {
    message: "End date must be on or after start date",
  });
