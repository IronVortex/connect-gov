# Connect Platform

A modern document management and service guidance platform built with Next.js 15 and NestJS.

## 🏗️ Architecture

The application is structured as a monorepo with separate frontend and backend:

```
connect-platform/
├── frontend/          # Next.js 15 application (Vercel)
├── backend/           # NestJS REST API (Railway/Render/AWS)
├── docker-compose.yml # Local development with Docker
└── package.json       # Root monorepo configuration
```

### Frontend
- **Framework:** Next.js 15 with TypeScript
- **Styling:** TailwindCSS v4 + shadcn/ui components
- **State Management:** React Context API
- **Features:**
  - Three-panel responsive dashboard layout
  - Department and service selection
  - Document upload with drag-and-drop
  - Real-time document type detection (DETECTED, MISMATCH, UNKNOWN)
  - Application tracking

### Backend
- **Framework:** NestJS with TypeScript
- **Database:** MongoDB with Mongoose
- **Features:**
  - RESTful API endpoints
  - Department and Service management
  - Document upload handling
  - Automatic document type detection
  - Application workflow management

## 🚀 Getting Started

### Quick Start with Docker (Recommended)

```bash
# Prerequisites: Docker and docker-compose installed

# Start all services
docker-compose up

# Access the app
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
# MongoDB: localhost:27017
```

### Manual Setup

#### Prerequisites

- Node.js 18+ and pnpm
- MongoDB running locally or connection string available
- For local MongoDB: `mongod`

#### Installation

1. **Install dependencies:**

```bash
# Install root dependencies
pnpm install

# Frontend dependencies are installed automatically
# Backend dependencies are installed automatically
```

2. **Set up environment variables:**

Backend (`.env` in `/backend`):
```
MONGODB_URI=mongodb://localhost:27017/connect-platform
NODE_ENV=development
API_PORT=3001
FRONTEND_URL=http://localhost:3000
```

Frontend (`.env.local` in `/frontend`):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. **Seed initial data (optional):**

```bash
cd backend
pnpm add -D ts-node
npx ts-node seed.ts
```

This creates sample departments and services for testing.

#### Development

Run both frontend and backend in development mode:

```bash
# From root directory
pnpm dev
```

Or run them separately:

```bash
# Terminal 1: Backend (http://localhost:3001)
cd backend
pnpm dev

# Terminal 2: Frontend (http://localhost:3000)
cd frontend
pnpm dev
```

## 📁 Project Structure

### Frontend (`/frontend`)

```
app/
  ├── layout.tsx           # Root layout with theme
  ├── page.tsx             # Home page
  ├── dashboard/
  │   └── page.tsx         # Main dashboard (3-panel layout)
  ├── applications/
  │   └── page.tsx         # Application tracking
  └── profile/
      └── page.tsx         # User profile

components/
  ├── layout/
  │   └── sidebar.tsx      # Department navigation sidebar
  ├── documents/
  │   ├── document-uploader.tsx    # Drag-drop upload component
  │   └── document-status.tsx      # Document status display
  └── services/
      └── service-selector.tsx     # Service selection panel

lib/
  ├── api.ts              # API client with endpoints
  ├── types.ts            # TypeScript types
  └── utils.ts            # Utility functions

styles/
  └── globals.css         # TailwindCSS with custom theme (white/blue)
```

### Backend (`/backend`)

```
src/
  ├── main.ts             # Application entry point
  ├── app.module.ts       # Main module with MongoDB config
  ├── controllers/
  │   ├── department.controller.ts
  │   ├── service.controller.ts
  │   └── document.controller.ts
  ├── services/
  │   ├── department.service.ts
  │   ├── service.service.ts
  │   └── document.service.ts
  ├── schemas/
  │   ├── department.schema.ts
  │   ├── service.schema.ts
  │   ├── user.schema.ts
  │   ├── uploaded-document.schema.ts
  │   └── application.schema.ts
  ├── dto/
  │   ├── department.dto.ts
  │   ├── service.dto.ts
  │   └── document.dto.ts
  └── database/           # Database utilities

seed.ts                    # Database seed script
```

## 🔌 API Endpoints

### Departments
- `GET /departments` - List all active departments
- `GET /departments/:id` - Get department details
- `POST /departments` - Create department
- `PUT /departments/:id` - Update department
- `DELETE /departments/:id` - Soft delete department

### Services
- `GET /services` - List all services
- `GET /services?departmentId=:id` - Filter by department
- `GET /services/:id` - Get service details
- `POST /services` - Create service
- `PUT /services/:id` - Update service
- `DELETE /services/:id` - Soft delete service

### Documents
- `POST /documents/upload` - Upload document (multipart/form-data)
- `POST /documents/detect` - Detect document type
- `GET /documents/user/:userId` - Get user's documents
- `GET /documents/service/:serviceId` - Get service documents
- `GET /documents/:id` - Get document details
- `POST /documents/:id/delete` - Delete document

## 🎨 Design & Styling

The application uses a clean white background with a blue (#007BFF) accent color:

- **Primary Color:** #007BFF (Blue)
- **Background:** White
- **Foreground:** Dark gray/black
- **Accents:** Light gray for secondary elements

The design follows a three-panel layout on the dashboard:
1. **Left Panel** - Document upload area (main content)
2. **Middle Panel** - Service selection
3. **Right Panel** - Document status display

## 🚀 Deployment

### Frontend Deployment (Vercel)

The frontend is optimized for Vercel deployment:

```bash
# Connect your GitHub repository to Vercel
# Configure root directory as: frontend
# Deploy automatically on push to main branch
```

### Backend Deployment (Railway/Render/AWS)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying the backend to:
- Railway (recommended - simplest setup)
- Render
- AWS ECS

## 📝 Environment Variables

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com  # Production
NEXT_PUBLIC_API_URL=http://localhost:3001       # Development
```

### Backend (`.env`)
```env
MONGODB_URI=mongodb://localhost:27017/connect-platform
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## 🧪 Testing

```bash
# Frontend tests (if Jest configured)
cd frontend && pnpm test

# Backend tests (if Jest configured)  
cd backend && pnpm test

# Build verification
cd frontend && pnpm build
cd backend && pnpm build
```

## 📚 Additional Resources

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review the DEPLOYMENT.md guide

## 📋 Document Detection

The backend automatically detects document types based on:
- File extensions (e.g., `.pdf`, `.doc`)
- File names (keywords like "passport", "income", "tax")
- MIME types

Detection results:
- ✅ **DETECTED** - Document type successfully identified
- ❌ **MISMATCH** - File format doesn't match filename
- ❓ **UNKNOWN** - Could not determine document type

## 🔐 Development Notes

- MongoDB must be running for the backend to start
- Frontend will fail to load services if backend is not accessible
- Document uploads are limited to 5MB
- Supported file types: PDF, DOC, DOCX, JPG, PNG

## 📦 Building for Production

### Frontend
```bash
cd frontend
pnpm build
pnpm start
```

### Backend
```bash
cd backend
pnpm build
pnpm start
```

## 🚢 Deployment

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `cd frontend && pnpm build`
3. Set start command: `cd frontend && pnpm start`
4. Add environment variables in Vercel dashboard

### Backend Deployment
Can be deployed to:
- Railway
- Render
- AWS EC2
- DigitalOcean
- Heroku

Requirements:
- Node.js 18+
- MongoDB Atlas connection string
- Environment variables configured

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please follow existing code patterns and add tests for new features.

## 📞 Support

For issues or questions, please create an issue in the repository.
