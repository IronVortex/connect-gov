# Connect Platform - Quick Reference

## Project Overview
A full-stack document management platform with a three-panel dashboard for handling government services and document uploads.

## Quick Commands

### Development
```bash
# Start everything with Docker
docker-compose up

# Or run separately
cd frontend && pnpm dev          # Frontend: localhost:3000
cd backend && pnpm dev           # Backend: localhost:3001
```

### Building
```bash
cd frontend && pnpm build        # Build frontend
cd backend && pnpm build         # Build backend
```

### Database
```bash
# Seed sample data
cd backend && npx ts-node seed.ts
```

## Key Files & Folders

### Frontend (`/frontend`)
- `app/dashboard/page.tsx` - Main dashboard with three-panel layout
- `components/layout/sidebar.tsx` - Navigation sidebar
- `components/documents/document-uploader.tsx` - File upload component
- `components/services/service-selector.tsx` - Service selection
- `lib/api.ts` - API client functions
- `lib/types.ts` - TypeScript types

### Backend (`/backend`)
- `src/main.ts` - Entry point
- `src/app.module.ts` - Main module configuration
- `src/controllers/*.ts` - Route handlers
- `src/services/*.ts` - Business logic
- `src/schemas/*.ts` - MongoDB models
- `seed.ts` - Sample data generator

## API Endpoints

### Departments
- `GET /api/departments` - List all departments
- `POST /api/departments` - Create department
- `GET /api/departments/:id` - Get department details
- `PUT /api/departments/:id` - Update department

### Services
- `GET /api/services` - List all services
- `GET /api/services/department/:deptId` - Get services by department
- `POST /api/services` - Create service
- `GET /api/services/:id` - Get service details

### Documents
- `POST /api/documents/upload` - Upload document
- `POST /api/documents/detect` - Detect document type
- `GET /api/documents/user/:userId` - Get user documents
- `GET /api/documents/:id` - Get document details

## Environment Variables

### Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:3001  # Local
NEXT_PUBLIC_API_URL=https://api.domain.com # Production
```

### Backend
```env
MONGODB_URI=mongodb://localhost:27017/connect-platform
PORT=3001
NODE_ENV=development
```

## UI Component Usage

### Common Components (from shadcn/ui)
```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
```

### Document Status Badges
- DETECTED (green) - Document type identified
- MISMATCH (yellow) - File doesn't match expected type
- UNKNOWN (gray) - Can't determine document type

## Deployment Checklist

### Frontend (Vercel)
- [ ] Connect GitHub repository to Vercel
- [ ] Set root directory to `frontend`
- [ ] Set environment variables
- [ ] Deploy

### Backend (Railway/Render)
- [ ] Create account on Railway or Render
- [ ] Connect GitHub repository
- [ ] Add MongoDB database
- [ ] Set environment variables
- [ ] Deploy

See DEPLOYMENT.md for detailed instructions.

## Troubleshooting

### Frontend won't start
```bash
cd frontend
rm -rf node_modules .next
pnpm install
pnpm dev
```

### Backend won't connect to MongoDB
- Check MongoDB is running: `mongod`
- Verify MONGODB_URI in .env
- Check MongoDB URI format: `mongodb://localhost:27017/connect-platform`

### CORS errors
- Backend has CORS enabled by default
- Check FRONTEND_URL in backend .env matches actual frontend URL

### Docker issues
```bash
# Clean up all containers
docker-compose down -v

# Rebuild
docker-compose up --build
```

## Project Stats

- Frontend: ~2000 lines of TypeScript/React
- Backend: ~2000 lines of TypeScript/NestJS
- Database: 5 MongoDB collections
- UI Components: 40+ shadcn components
- APIs: 12 REST endpoints

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React, TypeScript |
| Styling | TailwindCSS, shadcn/ui |
| Backend | NestJS, Node.js |
| Database | MongoDB, Mongoose |
| Deployment | Vercel (Frontend), Railway/Render (Backend) |
| DevOps | Docker, docker-compose |
| Version Control | Git, GitHub |

## Color Scheme

- Primary: #007BFF (Blue)
- Background: #FFFFFF (White)
- Text: #1F2937 (Dark gray)
- Border: #E5E7EB (Light gray)
- Success: #10B981 (Green)
- Warning: #F59E0B (Amber)
- Error: #EF4444 (Red)

## Support & Resources

- GitHub Issues: Bug reports and feature requests
- CONTRIBUTING.md: Contribution guidelines
- DEPLOYMENT.md: Detailed deployment guide
- README.md: Full documentation
- Next.js Docs: https://nextjs.org/docs
- NestJS Docs: https://docs.nestjs.com
- Mongoose Docs: https://mongoosejs.com

---

Last Updated: May 2026
Version: 1.0.0
