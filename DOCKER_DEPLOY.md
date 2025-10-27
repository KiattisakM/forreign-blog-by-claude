# Docker Deployment Guide

This guide explains how to build and deploy the Foreign Stock Blog using Docker.

---

## 📋 Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- GitHub account with packages enabled
- Nortezh account (for production deployment)

---

## 🏗️ Project Structure

```
.
├── Dockerfile                    # Frontend Docker image
├── nginx.conf                    # nginx configuration for frontend
├── server/
│   └── Dockerfile                # Backend Docker image
├── docker-compose.yml            # Local development with Docker
└── .github/workflows/
    └── deploy.yml                # CI/CD pipeline
```

---

## 🚀 Quick Start (Local Development)

### 1. Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### 2. Access the Application

- **Frontend:** http://localhost
- **Backend API:** http://localhost:3001
- **Database:** localhost:5432

---

## 🏭 Production Deployment

### Via GitHub Actions (Recommended)

1. **Set up GitHub Secrets:**
   - Go to repository Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `NTZ_SVA_EMAIL` - Nortezh service account email
     - `NTZ_SVA_KEY` - Nortezh service account key

2. **Create and Push a Tag:**

   ```bash
   # For production deployment
   git tag v1.0.0
   git push origin v1.0.0

   # For staging deployment
   git tag v1.0.0-rc.1
   git push origin v1.0.0-rc.1
   ```

3. **Monitor Deployment:**
   - Go to Actions tab in GitHub repository
   - Watch the "Deploy Foreign Stock Blog" workflow

### Manual Deployment

#### Build Images Locally

```bash
# Build frontend image
docker build -t stock-blog-frontend:latest .

# Build backend image
docker build -t stock-blog-backend:latest -f server/Dockerfile ./server

# Tag images
docker tag stock-blog-frontend:latest ghcr.io/your-username/stock-blog-frontend:latest
docker tag stock-blog-backend:latest ghcr.io/your-username/stock-blog-backend:latest

# Push to GitHub Container Registry
docker login ghcr.io
docker push ghcr.io/your-username/stock-blog-frontend:latest
docker push ghcr.io/your-username/stock-blog-backend:latest
```

---

## 🔧 Configuration

### Environment Variables

#### Backend (server/.env)

```env
DATABASE_URL="postgresql://blog_user:blog_password@postgres:5432/foreign_stock_blog?schema=public"
PORT=3001
NODE_ENV=production
CORS_ORIGIN=http://localhost
SCRAPER_ENABLED=false
```

#### Frontend (.env.production)

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

---

## 📦 Docker Images

### Frontend Image
- **Base:** `nginx:alpine`
- **Size:** ~50MB
- **Ports:** 80
- **Features:**
  - Gzip compression
  - Static asset caching
  - SPA routing support

### Backend Image
- **Base:** `node:18-alpine`
- **Size:** ~200MB
- **Ports:** 3001
- **Features:**
  - Multi-stage build
  - Prisma migrations
  - Non-root user
  - Health checks

---

## 🧪 Testing Docker Images

### Test Frontend

```bash
# Build and run frontend
docker build -t stock-blog-frontend:test .
docker run -p 8080:80 stock-blog-frontend:test

# Access at http://localhost:8080
```

### Test Backend

```bash
# Start PostgreSQL first
docker run -d \
  --name test-postgres \
  -e POSTGRES_DB=foreign_stock_blog \
  -e POSTGRES_USER=blog_user \
  -e POSTGRES_PASSWORD=blog_password \
  -p 5432:5432 \
  postgres:15-alpine

# Build and run backend
docker build -t stock-blog-backend:test -f server/Dockerfile ./server
docker run -p 3001:3001 \
  -e DATABASE_URL="postgresql://blog_user:blog_password@host.docker.internal:5432/foreign_stock_blog?schema=public" \
  stock-blog-backend:test

# Access API at http://localhost:3001/api
```

---

## 🔍 Debugging

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Enter Container

```bash
# Backend container
docker-compose exec backend sh

# Frontend container
docker-compose exec frontend sh

# Database container
docker-compose exec postgres psql -U blog_user -d foreign_stock_blog
```

### Check Health

```bash
# Backend health check
curl http://localhost:3001/health

# Frontend
curl http://localhost

# Database
docker-compose exec postgres pg_isready -U blog_user -d foreign_stock_blog
```

---

## 🚨 Troubleshooting

### Issue: Frontend can't connect to backend

**Solution:** Update nginx.conf to proxy API requests:

```nginx
location /api {
    proxy_pass http://backend:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### Issue: Backend can't connect to database

**Solution:** Check DATABASE_URL environment variable:
- Use service name `postgres` in Docker Compose
- Use `host.docker.internal` for local host connection
- Ensure PostgreSQL is healthy before starting backend

### Issue: Prisma migrations fail

**Solution:**
```bash
# Enter backend container
docker-compose exec backend sh

# Run migrations manually
npx prisma migrate deploy
npx prisma generate
```

### Issue: Build fails due to memory

**Solution:** Increase Docker memory:
```bash
# In Docker Desktop: Settings → Resources → Memory
# Increase to at least 4GB
```

---

## 📊 GitHub Actions Workflow

The CI/CD pipeline automatically:

1. **Triggers on:**
   - Tag push (`v*.*.*` or `v*.*.*-rc.*`)
   - Manual workflow dispatch

2. **Builds:**
   - Frontend Docker image
   - Backend Docker image

3. **Pushes to:**
   - GitHub Container Registry (ghcr.io)

4. **Deploys to:**
   - Nortezh platform
   - Environment based on tag (prod/staging)

### Workflow Stages

```
Tag Push → Build Frontend → Push Frontend → Deploy Frontend
         → Build Backend  → Push Backend  → Deploy Backend
```

---

## 🔐 Security Best Practices

1. **Never commit .env files**
2. **Use secrets for sensitive data**
3. **Keep base images updated**
4. **Run containers as non-root user** ✅
5. **Scan images for vulnerabilities**

```bash
# Scan images with Docker Scout
docker scout cves stock-blog-frontend:latest
docker scout cves stock-blog-backend:latest
```

---

## 📈 Performance Optimization

### Frontend
- ✅ Multi-stage build (reduces size)
- ✅ Gzip compression enabled
- ✅ Static asset caching
- ✅ nginx optimized configuration

### Backend
- ✅ Multi-stage build
- ✅ Production dependencies only
- ✅ Prisma Client generated at build time
- ✅ Non-root user for security

---

## 🔄 Updating Deployment

1. **Make code changes**
2. **Commit and push to main**
3. **Create a new tag:**
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```
4. **GitHub Actions will automatically deploy**

---

## 📝 Notes

- Frontend uses nginx for serving static files
- Backend runs Node.js with Express
- Database uses PostgreSQL 15
- All containers use Alpine Linux for smaller size
- Health checks ensure services start in correct order

---

## 🆘 Support

If you encounter issues:
1. Check logs: `docker-compose logs -f`
2. Verify environment variables
3. Ensure ports are not in use
4. Check Docker resource allocation
5. Review GitHub Actions logs

---

**Last Updated:** 2025-10-27
