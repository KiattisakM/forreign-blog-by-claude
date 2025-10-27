# Foreign Stock Blog - Backend API

Backend API for the Foreign Stock Blog application built with Express, TypeScript, Prisma, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+ installed and running

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update the `DATABASE_URL` with your PostgreSQL credentials:
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/foreign_stock_blog?schema=public"
   ```

3. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

4. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```

5. **Seed the database:**
   ```bash
   npm run prisma:seed
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`

## 📚 API Endpoints

### Articles

- `GET /api/articles` - Get all articles with filtering and pagination
  - Query params: `market`, `sector`, `category`, `search`, `page`, `limit`, `sortBy`, `order`
- `GET /api/articles/:slug` - Get single article by slug
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### Markets

- `GET /api/markets` - Get all available markets

### Sectors

- `GET /api/sectors` - Get all available sectors

### Health Check

- `GET /health` - Server health status

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with sample data
- `npm run prisma:studio` - Open Prisma Studio (GUI for database)

## 📁 Project Structure

```
server/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts            # Seed script
├── src/
│   ├── controllers/       # Request handlers
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── middleware/       # Express middleware
│   ├── types/           # TypeScript types
│   ├── utils/           # Utilities
│   └── index.ts         # App entry point
├── .env                 # Environment variables
├── tsconfig.json        # TypeScript config
└── package.json
```

## 🗄️ Database Schema

- **Author** - Article authors
- **Article** - Stock articles with embedded stock info
- Enums: StockMarket, Sector, Exchange, Currency, ArticleCategory, ReadingLevel, Sentiment

## 🔧 Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Middleware:** CORS, dotenv

## 📝 Notes

- Authentication is not implemented yet (planned for future release)
- Default pagination limit is 10 items per page (max 100)
- All timestamps are in ISO 8601 format
- CORS is configured for `http://localhost:5173` (frontend dev server)

## 🚧 TODO

- [ ] Add authentication (JWT)
- [ ] Add rate limiting
- [ ] Add request validation
- [ ] Add comprehensive tests
- [ ] Add API documentation (Swagger)
- [ ] Add logging (Winston/Pino)
- [ ] Add caching (Redis)
- [ ] Deploy to production
