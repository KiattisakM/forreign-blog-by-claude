# Auto Stock Data Scraper Guide

## ⚠️ Legal Notice

**This scraper is for educational and personal use only.**

- Web scraping may violate the Terms of Service of investing.com
- Use at your own risk
- Do NOT use for commercial purposes
- Implement respectful rate limiting
- Consider using official financial APIs instead

## 🎯 What It Does

Automatically scrapes stock market data from https://th.investing.com/ including:
- Thai market indices (SET, SET50, MAI)
- Real-time prices and changes
- Saves historical data to database
- Scheduled updates every hour (configurable)

## 📁 File Structure

```
server/src/
├── scrapers/
│   ├── types.ts                    # Type definitions
│   ├── investing/
│   │   ├── index.ts
│   │   ├── stockScraper.ts         # Main Puppeteer scraper
│   │   └── utils.ts                # Helper functions
│   └── test-scraper.ts             # Test script
├── jobs/
│   └── scraperJob.ts               # Cron scheduler
├── services/
│   └── marketData.service.ts       # Database operations
├── controllers/
│   └── scraper.controller.ts       # API handlers
└── routes/
    └── scraper.routes.ts           # API routes
```

## 🚀 Setup

### 1. Database Migration

The Prisma schema has been extended with new tables:
- `MarketIndex` - Store index data
- `StockPrice` - Store stock prices
- `ScraperLog` - Track scraper activity

Run migration:
```bash
cd server
npm run prisma:generate
npm run prisma:migrate dev --name add-scraper-tables
```

### 2. Environment Configuration

In `server/.env`:
```env
# Enable/disable scraper
SCRAPER_ENABLED=false

# Cron schedule (default: every hour)
# Format: minute hour day month day-of-week
# Examples:
#   0 * * * *     = Every hour
#   */30 * * * *  = Every 30 minutes
#   0 9-17 * * *  = Every hour from 9 AM to 5 PM
SCRAPER_SCHEDULE=0 * * * *

# Run scraper immediately on server start
SCRAPER_RUN_ON_START=false
```

### 3. Testing the Scraper

Test manually before enabling automation:

```bash
# Run test script
npx ts-node src/scrapers/test-scraper.ts
```

Expected output:
```
🧪 Testing Investing.com Scraper...
🚀 Initializing Puppeteer browser...
✅ Browser initialized
📡 Navigating to investing.com...
⏳ Waiting for page to load...
📊 Found 8 index entries
✅ Scraping successful

📊 Scraper Result:
Success: true
Timestamp: 2025-10-24T04:49:15.013Z
Source: investing.com

✅ Found 8 indices:

SET (SET)
  Value: 1,313.72
  Change: 11.37 (0.87%)

FTSE SET All-Share (SET-ALL)
  Value: 1,457.23
  Change: 13.61 (0.94%)

SET 50 (SET50)
  Value: 857.52
  Change: 9.18 (1.08%)

... (and 5 more indices)

🔒 Browser closed
✅ Test complete
```

## 📚 API Endpoints

### POST /api/scraper/trigger
Manually trigger a scrape job.

**Example:**
```bash
curl -X POST http://localhost:3001/api/scraper/trigger
```

**Response:**
```json
{
  "success": true,
  "message": "Scraper started in background"
}
```

### GET /api/scraper/health
Get scraper health status.

**Example:**
```bash
curl http://localhost:3001/api/scraper/health
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "SUCCESS",
    "lastRun": "2025-10-24T11:00:00.000Z",
    "lastSuccess": "2025-10-24T11:00:00.000Z",
    "totalRuns": 24,
    "successCount": 23,
    "errorCount": 1,
    "successRate": 95.83
  }
}
```

### GET /api/scraper/logs?limit=50
Get scraper execution logs.

**Example:**
```bash
curl http://localhost:3001/api/scraper/logs?limit=10
```

### GET /api/scraper/market-data
Get latest scraped market data.

**Example:**
```bash
curl http://localhost:3001/api/scraper/market-data
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "code": "SET",
      "name": "ดัชนี SET",
      "value": 1425.50,
      "change": 12.3,
      "changePercent": 0.87,
      "timestamp": "2025-10-24T11:00:00.000Z"
    }
  ]
}
```

### GET /api/scraper/index/:code/history?limit=100
Get historical data for a specific index.

**Example:**
```bash
curl http://localhost:3001/api/scraper/index/SET/history?limit=50
```

## ⚙️ Usage

### Enable Automatic Scraping

1. Update `.env`:
   ```env
   SCRAPER_ENABLED=true
   SCRAPER_SCHEDULE=0 * * * *
   SCRAPER_RUN_ON_START=true
   ```

2. Restart server:
   ```bash
   npm run dev
   ```

3. Scraper will run automatically based on schedule

### Manual Scraping

Use API endpoint:
```bash
curl -X POST http://localhost:3001/api/scraper/trigger
```

Or run test script:
```bash
npx ts-node src/scrapers/test-scraper.ts
```

## 📊 Monitoring

### Check Scraper Status

```bash
# Get health status
curl http://localhost:3001/api/scraper/health

# View logs
curl http://localhost:3001/api/scraper/logs?limit=20

# Check latest data
curl http://localhost:3001/api/scraper/market-data
```

### Database Queries

```sql
-- View latest index data
SELECT * FROM "MarketIndex" ORDER BY timestamp DESC LIMIT 10;

-- View scraper logs
SELECT * FROM "ScraperLog" ORDER BY timestamp DESC LIMIT 20;

-- Calculate success rate
SELECT
  COUNT(*) as total_runs,
  SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as success_count,
  (SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END)::float / COUNT(*) * 100) as success_rate
FROM "ScraperLog";
```

## 🔧 Configuration

### Cron Schedule Examples

```env
# Every hour
SCRAPER_SCHEDULE=0 * * * *

# Every 30 minutes
SCRAPER_SCHEDULE=*/30 * * * *

# Every 4 hours
SCRAPER_SCHEDULE=0 */4 * * *

# Every day at 9 AM
SCRAPER_SCHEDULE=0 9 * * *

# Business hours only (9 AM - 5 PM, every hour)
SCRAPER_SCHEDULE=0 9-17 * * 1-5

# Multiple times: 9 AM, 12 PM, 3 PM on weekdays
SCRAPER_SCHEDULE=0 9,12,15 * * 1-5
```

### Scraper Behavior

- **Rate Limiting:** 3 seconds between requests (configurable in `utils.ts`)
- **Retry Logic:** 3 attempts with exponential backoff
- **Timeout:** 30 seconds per page load
- **User Agent:** Appears as regular Chrome browser

## 🐛 Troubleshooting

### Problem: Puppeteer not launching

**Solution:** Install Chromium dependencies
```bash
# macOS
brew install chromium

# Linux
sudo apt-get install chromium-browser
```

### Problem: No data scraped

**Possible causes:**
1. Website structure changed
2. Page load timeout
3. Network issues

**Debug:**
```bash
# Run test script to see error details
npx ts-node src/scrapers/test-scraper.ts

# Check logs
curl http://localhost:3001/api/scraper/logs
```

### Problem: Scraper blocked/banned

**Solution:**
- Increase rate limiting delay
- Add random delays
- Use proxy rotation
- Consider switching to official APIs

### Problem: High memory usage

**Solution:**
- Reduce scraping frequency
- Close browser after each scrape (already implemented)
- Monitor with `htop` or Activity Monitor

## ⚡ Performance

**Resource Usage:**
- Memory: ~200-300MB per scrape (Puppeteer)
- CPU: Moderate during scraping
- Database: ~1KB per index record

**Optimization Tips:**
1. Use Cheerio instead of Puppeteer (if site allows)
2. Run during off-peak hours
3. Implement data deduplication
4. Add caching layer

## 🎯 Future Enhancements

- [ ] Scrape individual stock prices
- [ ] Scrape news articles
- [ ] Add proxy rotation
- [ ] Implement data deduplication
- [ ] Add email alerts for failures
- [ ] Create web dashboard
- [ ] Export to CSV/JSON
- [ ] Switch to Cheerio for performance
- [ ] Add more markets (global indices)

## 📝 Notes

- Always check Terms of Service before scraping
- Implement respectful delays between requests
- Monitor for website structure changes
- Keep scraper code maintainable
- Consider official APIs as first choice
- Use scraping only when necessary

## 🆘 Support

If scraping fails consistently:
1. Review Terms of Service
2. Consider official APIs (Alpha Vantage, Yahoo Finance)
3. Contact data providers for licensing
4. Implement manual data entry as fallback
