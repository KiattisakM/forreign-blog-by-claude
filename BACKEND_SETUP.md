# Backend Setup Guide

## ✅ What We've Built

A complete backend API with:
- Express.js + TypeScript server
- PostgreSQL database with Prisma ORM
- RESTful API endpoints for articles, markets, and sectors
- Filtering, pagination, and sorting
- CORS configuration
- Error handling middleware
- Database seeding script
- Vite proxy for frontend integration

## 🚀 Next Steps (Manual Setup Required)

### Step 1: Install PostgreSQL

**Option A: Using Homebrew (macOS)**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Option B: Using Docker (All platforms)**
```bash
docker run --name postgres-blog -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:14
```

**Option C: Download from postgresql.org**
- Visit https://www.postgresql.org/download/
- Install and start PostgreSQL

### Step 2: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE foreign_stock_blog;

# Exit psql
\q
```

### Step 3: Set Up Backend

```bash
# Navigate to server directory
cd server

# Install dependencies (already done, but in case)
npm install

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed

# Start backend server
npm run dev
```

The backend API will be running at `http://localhost:3001`

### Step 4: Verify Backend is Working

Open a new terminal and test the API:

```bash
# Health check
curl http://localhost:3001/health

# Get articles
curl http://localhost:3001/api/articles

# Get markets
curl http://localhost:3001/api/markets

# Get sectors
curl http://localhost:3001/api/sectors
```

You should see JSON responses!

### Step 5: Connect Frontend to Backend

The Vite proxy is already configured. To test the full integration:

1. Keep the backend running (`npm run dev` in `server/`)
2. In a new terminal, start the frontend:
   ```bash
   # From project root
   npm run dev
   ```

### Step 6: Update Frontend to Use API (TODO)

Currently, the frontend uses mock data. You'll need to:

1. Create an API service layer (`src/services/api.ts`)
2. Create hooks to fetch data (`src/hooks/useArticles.ts`)
3. Update pages to use the API instead of mock data

Example API service:
```typescript
// src/services/api.ts
const API_BASE = '/api';

export const articleAPI = {
  getArticles: async (params?: any) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/articles?${query}`);
    return res.json();
  },

  getArticleBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE}/articles/${slug}`);
    return res.json();
  }
};
```

## 📁 Backend File Structure

```
server/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Seed script (2 sample articles)
├── src/
│   ├── controllers/
│   │   └── article.controller.ts
│   ├── routes/
│   │   ├── article.routes.ts
│   │   ├── market.routes.ts
│   │   └── sector.routes.ts
│   ├── services/
│   │   └── article.service.ts
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   └── notFound.middleware.ts
│   ├── types/
│   │   └── api.types.ts
│   ├── utils/
│   │   └── prisma.ts
│   └── index.ts
├── .env                       # Environment variables
├── .env.example              # Example env file
├── tsconfig.json             # TypeScript config
├── nodemon.json              # Nodemon config
├── package.json
└── README.md                 # Backend documentation
```

## 🔧 Environment Variables

Already configured in `server/.env`:
```env
PORT=3001
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/foreign_stock_blog?schema=public"
CORS_ORIGIN=http://localhost:5173
API_PREFIX=/api
```

Update `DATABASE_URL` if your PostgreSQL credentials are different.

## 📚 API Documentation

### GET /api/articles
Get all articles with optional filtering and pagination.

**Query Parameters:**
- `market` - Filter by market (US, EU, ASIA, etc.)
- `sector` - Filter by sector (TECHNOLOGY, FINANCE, etc.)
- `category` - Filter by category (ANALYSIS, NEWS, etc.)
- `search` - Search in title, excerpt, company name, symbol
- `featured` - Filter featured articles (true/false)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sortBy` - Sort field (default: publishedAt)
- `order` - Sort order (asc/desc, default: desc)

**Example:**
```bash
curl "http://localhost:3001/api/articles?market=US&sector=TECHNOLOGY&page=1&limit=10"
```

### GET /api/articles/:slug
Get a single article by slug.

**Example:**
```bash
curl http://localhost:3001/api/articles/apple-reaches-new-all-time-high
```

### GET /api/markets
Get all available markets.

### GET /api/sectors
Get all available sectors.

## 🎯 Current Status

✅ **Completed:**
- Backend project structure
- TypeScript configuration
- Database schema design
- Prisma ORM setup
- Express server with middleware
- Article CRUD endpoints
- Market & sector endpoints
- Pagination & filtering
- Error handling
- CORS configuration
- Seed script (2 sample articles)
- Vite proxy configuration
- Documentation

⏳ **Pending (Manual Steps):**
- Install PostgreSQL
- Run migrations
- Seed database
- Test API endpoints
- Create frontend API service layer
- Update frontend to use backend
- End-to-end testing

🚧 **Future Enhancements:**
- Add more sample articles to seed script
- Implement authentication (JWT)
- Add request validation
- Add API tests
- Add rate limiting
- Deploy to production
- Add caching (Redis)
- Add logging (Winston)

## 🐛 Troubleshooting

**Problem:** "Cannot connect to database"
- **Solution:** Make sure PostgreSQL is running and credentials in `.env` are correct

**Problem:** "Prisma Client not generated"
- **Solution:** Run `npm run prisma:generate`

**Problem:** "CORS error in frontend"
- **Solution:** Verify backend is running on port 3001 and Vite proxy is configured

**Problem:** "Port 3001 already in use"
- **Solution:** Change `PORT` in `.env` or kill the process using port 3001

## 📝 Notes

- Default pagination: 10 items per page (max 100)
- Seed script includes only 2 articles - expand it with more data from `src/data/mockStockArticles.ts`
- Authentication is not implemented yet (planned for Phase 4)
- All API responses follow this format:
  ```json
  {
    "success": true,
    "data": {...},
    "meta": {...} // pagination info
  }
  ```

## 🎉 Success Criteria

You'll know everything is working when:
1. Backend starts without errors: `npm run dev` in `server/`
2. Health check returns OK: `curl http://localhost:3001/health`
3. Articles endpoint returns data: `curl http://localhost:3001/api/articles`
4. Frontend and backend communicate through Vite proxy

Happy coding! 🚀
