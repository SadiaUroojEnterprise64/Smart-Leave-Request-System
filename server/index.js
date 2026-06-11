const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { z } = require("zod");

/*
  HOW DATA IS STORED
  ------------------
  `leaves` is a plain JavaScript array in server memory (RAM).
  When you POST a leave, it is pushed into this array.
  When the server process stops or restarts, the array is cleared — nothing is written to disk or a database.
*/

const app = express();
app.use(cors());
app.use(express.json());

const LEAVE_TYPES = ["sick", "casual", "annual", "overtime"];
const STATUSES = ["pending", "approved", "rejected"];

let leaves = [];

const leaveSchema = z
  .object({
    type: z.enum(LEAVE_TYPES),
    fromDate: z.string(),
    toDate: z.string(),
  })
  .refine((data) => data.toDate >= data.fromDate, {
    message: "End date must be on or after start date",
  });

const statusSchema = z.object({
  status: z.enum(["approved", "rejected"]),
});

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Leave API is running" });
});

// GET /leaves — return all leave requests
app.get("/leaves", (_req, res) => {
  res.json(leaves);
});

// POST /leaves — employee applies for leave (validated, saved in memory)
app.post("/leaves", (req, res) => {
  const result = leaveSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: result.error.flatten(),
      message: result.error.issues[0]?.message ?? "Invalid leave request",
    });
  }

  const newLeave = {
    id: crypto.randomUUID(),
    status: "pending",
    ...result.data,
  };

  leaves.push(newLeave);
  res.status(201).json(newLeave);
});

// PUT /leaves/:id — manager approves or rejects a request
app.put("/leaves/:id", (req, res) => {
  const result = statusSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: result.error.flatten(),
      message: result.error.issues[0]?.message ?? "Invalid leave request",
    });
  }

  const leave = leaves.find((l) => l.id === req.params.id);
  if (!leave) {
    return res.status(404).json({ error: "Leave not found" });
  }

  leave.status = result.data.status;
  res.json(leave);
});

// Vercel runs this file as a serverless function — export the app, don't only listen.
module.exports = app;

// Local development only
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Leave types: ${LEAVE_TYPES.join(", ")}`);
  });
}
