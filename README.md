# 📝 Task Management Dashboard

A full-stack task management application built with **React**, **TypeScript**,
**Node.js**, **Express**, **MongoDB**, and **Socket.io**.  
The application allows users to manage tasks efficiently with real-time updates
and secure authentication.

---

## 🚀 Features

- User authentication using JWT (stored in **HttpOnly cookies**)
- Create, update, and delete tasks
- Task status management (Pending / Completed)
- Task priority and due date support
- Automatic overdue task detection
- Real-time task updates using Socket.io
- Modern, responsive dashboard UI

---

## 🛠 Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- React Query
- Socket.io Client

### Backend
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Socket.io

---

## 🔐 Authentication

- Secure JWT-based authentication
- Tokens stored in **HttpOnly cookies**
- Protected API routes
- Cookie-based auth (no localStorage usage)

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=supersecretkey
CLIENT_URL=https://your-frontend-url.vercel.app 
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 🖥 Local Setup

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
---

## 🌍 Deployment

Backend → Render
Frontend → Vercel

## 👤 Author

Built by Kanika Agarwal

### ✅ Commit this README
```bash
git add README.md
git commit -m "Add project README"
git push
```