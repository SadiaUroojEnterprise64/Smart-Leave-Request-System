# Smart-Leave-Request-System
It's a mini HR web application built with React, Ant Design, Zustand, and Node.js. It lets employees apply for leave by selecting dates and type, while managers can approve or reject requests. It includes Zod-based validation, real-time status tracking (Pending, Approved, Rejected), and a simple REST API backend for managing leave data.

## How the entire application works

![Application flow: React → Zustand → Express → in-memory store]

## Run

```bash
# Terminal 1 — backend (keep this running)
cd server && npm install && npm start
# or: npm run dev

# Terminal 2 — frontend
cd client && npm install && npm run dev
```

Open http://localhost:5173.
