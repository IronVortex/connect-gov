# Deployment Guide - Connect Platform

## Overview
This monorepo contains a Next.js frontend and NestJS backend. They can be deployed independently.

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository connected

### Steps
1. **Connect to Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository

2. **Configure Project Settings**
   - Root Directory: `frontend`
   - Framework: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`

3. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
   ```

4. **Deploy**
   - Save and deploy - Vercel will automatically redeploy on git push

## Backend Deployment (Railway / Render)

### Option 1: Railway (Recommended)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository

3. **Configure Service**
   - Service: `backend`
   - Root Directory: `backend`
   - Build Command: `pnpm build`
   - Start Command: `node dist/main`

4. **Add MongoDB**
   - Click "+ Add" → "Database" → "MongoDB"
   - Railway will provision MongoDB and provide `MONGODB_URI`

5. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=3001
   MONGODB_URI=(auto-filled by Railway)
   ```

6. **Deploy**
   - Connect your domain if desired
   - Deploy button will appear

### Option 2: Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Service**
   - Name: `connect-backend`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `pnpm build`
   - Start Command: `node dist/main`
   - Enviroment: `production`

4. **Add MongoDB (Render)
   - Use MongoDB Atlas or MongoDB Cloud
   - Create database and get connection URI

5. **Set Environment Variables**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/connect-platform
   PORT=3001
   ```

6. **Deploy**
   - Save and deploy

### Option 3: AWS (ECS + Aurora)

1. **Create RDS MongoDB Cluster**
   - Use DocumentDB (MongoDB-compatible)
   - Get connection string

2. **Create ECS Cluster**
   - Define task with Docker image
   - Set environment variables
   - Configure port 3001

3. **Set up ALB (Application Load Balancer)**
   - Route traffic to ECS service
   - Configure SSL certificate

4. **Push Docker Image**
   ```bash
   docker build -t connect-backend ./backend
   docker tag connect-backend:latest YOUR_ECR_REPO/connect-backend:latest
   docker push YOUR_ECR_REPO/connect-backend:latest
   ```

## Local Development with Docker

```bash
# Start all services
docker-compose up

# Backend runs on http://localhost:3001
# Frontend runs on http://localhost:3000
# MongoDB runs on mongodb://localhost:27017

# Stop services
docker-compose down
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api  # Local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com  # Production
```

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/connect-platform
NODE_ENV=development
PORT=3001
```

## GitHub Actions (Optional CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        uses: railway-app/actions@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend
```

## Troubleshooting

### Frontend Issues
- **500 error**: Check backend URL in `.env.local`
- **CORS error**: Ensure backend has proper CORS headers configured
- **Page not found**: Verify Next.js build succeeded

### Backend Issues
- **MongoDB connection error**: Check connection string and network access
- **Port already in use**: Change `PORT` environment variable
- **Module not found**: Run `pnpm install` and rebuild

### Database Issues
- **Connection timeout**: Check MongoDB Atlas IP whitelist
- **Authentication failed**: Verify username/password in connection string
- **No database**: Ensure seed script ran successfully

## Monitoring

### Frontend (Vercel)
- Built-in analytics and error tracking
- Automatic performance monitoring

### Backend (Railway/Render)
- View logs in dashboard
- Set up log alerts
- Monitor CPU and memory usage

## Scaling

### Frontend
- Vercel auto-scales based on traffic
- Use Edge Middleware for optimization

### Backend
- Configure auto-scaling on Railway/Render
- Monitor database connection pool
- Add caching layer (Redis) for frequently accessed data
