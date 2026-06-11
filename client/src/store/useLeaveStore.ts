import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000";

export interface Leave {
  id: string;
  name?: string;
  type: string;
  fromDate: string;
  toDate: string;
  status: "pending" | "approved" | "rejected";
}

interface Store {
  leaves: Leave[];
  fetchLeaves: () => Promise<void>;
  applyLeave: (data: {
    name: string;
    type: string;
    fromDate: string;
    toDate: string;
  }) => Promise<void>;
  updateStatus: (id: string, status: string) => Promise<void>;
}

function getErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return "Something went wrong";
  }

  if (error.code === "ERR_NETWORK") {
    return "Cannot reach server. Run: cd server && npm start";
  }

  const data = error.response?.data as {
    message?: string;
    error?: { fieldErrors?: { type?: string[] } };
  };

  if (data?.message) {
    return data.message;
  }

  const typeError = data?.error?.fieldErrors?.type?.[0];
  if (typeError?.includes("Invalid option")) {
    return "Server is outdated — stop it (Ctrl+C) and run: cd server && npm start";
  }

  if (error.response?.status === 400) {
    return "Invalid leave data — check type and dates";
  }

  return error.message;
}

export const useLeaveStore = create<Store>((set) => ({
  leaves: [],

  fetchLeaves: async () => {
    const res = await axios.get(`${API_URL}/leaves`);
    set({ leaves: res.data });
  },

  applyLeave: async (data) => {
    const { name, ...payload } = data;
    try {
      const res = await axios.post(`${API_URL}/leaves`, payload);
      set((s) => ({
        leaves: [...s.leaves, { ...res.data, name }],
      }));
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  updateStatus: async (id, status) => {
    await axios.put(`${API_URL}/leaves/${id}`, { status });
    set((s) => ({
      leaves: s.leaves.map((l) =>
        l.id === id ? { ...l, status: status as Leave["status"] } : l
      ),
    }));
  },
}));
