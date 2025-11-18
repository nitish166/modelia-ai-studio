# Modelia AI Studio

A full-stack web application for simulating AI-powered fashion image generation.

## 🚀 Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT + Bcrypt

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL (or use Docker)
- Git

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd modelia-ai-studio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your database credentials
```

### 4. Set up the database
```bash
cd backend
npx prisma migrate dev
npx prisma generate
cd ..
```

### 5. Run the application
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📦 Project Structure

```
modelia-ai-studio/
├── backend/          # Express API server
├── frontend/         # React application
└── shared/           # Shared TypeScript types
```

## 🧪 Testing

```bash
npm test
```

## 📝 Features

- ✅ User authentication (register/login)
- ✅ Image upload with text prompts
- ✅ Simulated AI generation
- ✅ Generation history (last 5)
- ✅ Error handling

## 👤 Author

Nitish Kumar
