import { useState } from "react";
import { Form, Select, DatePicker, Button, Modal, Input, message } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useLeaveStore } from "../store/useLeaveStore";
import { leaveSchema } from "../schema/leaveSchema";

interface Props {
  open: boolean;
  onClose: () => void;
}

function toDayjs(value: unknown): Dayjs | null {
  if (value == null) return null;
  const parsed = dayjs(value as string | Date | Dayjs);
  return parsed.isValid() ? parsed : null;
}

function buildLeaveDates(
  type: string,
  date?: unknown,
  dates?: unknown
): { fromDate: string; toDate: string } | null {
  if (type === "annual") {
    if (!Array.isArray(dates) || dates.length !== 2) return null;

    const start = toDayjs(dates[0]);
    const end = toDayjs(dates[1]);
    if (!start || !end) return null;

    return {
      fromDate: start.format("YYYY-MM-DD"),
      toDate: end.format("YYYY-MM-DD"),
    };
  }

  const single = toDayjs(date);
  if (!single) return null;

  const day = single.format("YYYY-MM-DD");
  return { fromDate: day, toDate: day };
}

export default function ApplyLeaveModal({ open, onClose }: Props) {
  const applyLeave = useLeaveStore((s) => s.applyLeave);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const leaveType = Form.useWatch("type", form);
  const isAnnual = leaveType === "annual";

  const handleTypeChange = () => {
    form.setFieldsValue({ date: undefined, dates: undefined });
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const onFinish = async (values: {
    name: string;
    type: string;
    date?: unknown;
    dates?: unknown;
  }) => {
    const range = buildLeaveDates(values.type, values.date, values.dates);

    if (!range) {
      message.error(
        isAnnual ? "Please select a valid date range" : "Please select a date"
      );
      return;
    }

    const data = {
      name: values.name,
      type: values.type,
      fromDate: range.fromDate,
      toDate: range.toDate,
    };

    const result = leaveSchema.safeParse(data);

    if (!result.success) {
      message.error("Validation failed — check your dates");
      return;
    }

    try {
      setSubmitting(true);
      await applyLeave(data);
      message.success("Leave Applied");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Failed to apply leave"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title="Apply Leave"
      open={open}
      onCancel={handleClose}
      footer={null}
      destroyOnClose
      afterClose={() => form.resetFields()}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Employee Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Leave Type"
          rules={[{ required: true, message: "Please select leave type" }]}
        >
          <Select placeholder="Select type" onChange={handleTypeChange}>
            <Select.Option value="sick">Sick</Select.Option>
            <Select.Option value="casual">Casual</Select.Option>
            <Select.Option value="annual">Annual</Select.Option>
            <Select.Option value="overtime">Overtime</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dates"
          label="Start Date – End Date"
          rules={[
            { required: isAnnual, message: "Please select a date range" },
          ]}
          hidden={!isAnnual}
        >
          <DatePicker.RangePicker className="w-full" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: !isAnnual, message: "Please select a date" }]}
          hidden={isAnnual}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item className="mb-0">
          <div className="flex justify-end gap-4">
            <Button onClick={handleClose}>Cancel</Button>
            <Button htmlType="submit" type="primary" loading={submitting}>
              Apply Leave
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
