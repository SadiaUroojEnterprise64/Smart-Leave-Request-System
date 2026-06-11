# Smart-Leave-Request-System
It's a mini HR web application built with React, Ant Design, Zustand, and Node.js. It lets employees apply for leave by selecting dates and type, while managers can approve or reject requests. It includes Zod-based validation, real-time status tracking (Pending, Approved, Rejected), and a simple REST API backend for managing leave data.

## How the entire application works
![Application flow: React → Zustand → Express → in-memory store]
<img width="718" height="797" alt="image" src="https://github.com/user-attachments/assets/1a81a6f6-20a3-4576-9004-a8f8ccbf5f41" />

##GUI
<img width="1895" height="862" alt="image" src="https://github.com/user-attachments/assets/b1bf5003-da82-45d7-9bea-7a0eb7fa4244" />

## Run

```bash
# Terminal 1 — backend (keep this running)
cd server && npm install && npm start
# or: npm run dev

# Terminal 2 — frontend
cd client && npm install && npm run dev
```

Open http://localhost:5173.
