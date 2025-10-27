-- CreateEnum
CREATE TYPE "StockMarket" AS ENUM ('US', 'EU', 'ASIA', 'UK', 'CANADA', 'AUSTRALIA');

-- CreateEnum
CREATE TYPE "Sector" AS ENUM ('TECHNOLOGY', 'FINANCE', 'HEALTHCARE', 'ENERGY', 'CONSUMER', 'INDUSTRIALS', 'MATERIALS', 'UTILITIES', 'REAL_ESTATE', 'COMMUNICATIONS');

-- CreateEnum
CREATE TYPE "Exchange" AS ENUM ('NYSE', 'NASDAQ', 'LSE', 'EURONEXT', 'TSE', 'HKEX', 'SSE', 'ASX', 'TSX');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'GBP', 'JPY', 'CNY', 'AUD', 'CAD', 'HKD');

-- CreateEnum
CREATE TYPE "ArticleCategory" AS ENUM ('ANALYSIS', 'NEWS', 'EDUCATION', 'OPINION', 'EARNINGS', 'MARKET_UPDATE');

-- CreateEnum
CREATE TYPE "ReadingLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "Sentiment" AS ENUM ('BULLISH', 'BEARISH', 'NEUTRAL');

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "ArticleCategory" NOT NULL,
    "readingLevel" "ReadingLevel" NOT NULL,
    "authorId" TEXT NOT NULL,
    "stockSymbol" TEXT NOT NULL,
    "stockCompanyName" TEXT NOT NULL,
    "stockMarket" "StockMarket" NOT NULL,
    "stockExchange" "Exchange" NOT NULL,
    "stockSector" "Sector" NOT NULL,
    "stockCurrency" "Currency" NOT NULL,
    "stockDescription" TEXT,
    "stockWebsite" TEXT,
    "stockMarketCap" TEXT,
    "stockFoundedYear" INTEGER,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "readTime" INTEGER NOT NULL,
    "tags" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "priceTarget" DOUBLE PRECISION,
    "priceTargetTimeframe" TEXT,
    "sentiment" "Sentiment",
    "relatedStocks" JSONB,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketIndex" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "changePercent" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'investing.com',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockPrice" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "changePercent" DOUBLE PRECISION NOT NULL,
    "volume" BIGINT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'investing.com',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScraperLog" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "recordCount" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "duration" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScraperLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE INDEX "Article_slug_idx" ON "Article"("slug");

-- CreateIndex
CREATE INDEX "Article_stockMarket_idx" ON "Article"("stockMarket");

-- CreateIndex
CREATE INDEX "Article_stockSector_idx" ON "Article"("stockSector");

-- CreateIndex
CREATE INDEX "Article_category_idx" ON "Article"("category");

-- CreateIndex
CREATE INDEX "Article_publishedAt_idx" ON "Article"("publishedAt");

-- CreateIndex
CREATE INDEX "Article_featured_idx" ON "Article"("featured");

-- CreateIndex
CREATE INDEX "MarketIndex_code_timestamp_idx" ON "MarketIndex"("code", "timestamp");

-- CreateIndex
CREATE INDEX "MarketIndex_timestamp_idx" ON "MarketIndex"("timestamp");

-- CreateIndex
CREATE INDEX "StockPrice_symbol_timestamp_idx" ON "StockPrice"("symbol", "timestamp");

-- CreateIndex
CREATE INDEX "StockPrice_timestamp_idx" ON "StockPrice"("timestamp");

-- CreateIndex
CREATE INDEX "ScraperLog_type_timestamp_idx" ON "ScraperLog"("type", "timestamp");

-- CreateIndex
CREATE INDEX "ScraperLog_status_idx" ON "ScraperLog"("status");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
