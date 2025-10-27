import { Router } from 'express';
import scraperController from '../controllers/scraper.controller';

const router = Router();

// POST /api/scraper/trigger - Manually trigger scrape
router.post('/trigger', scraperController.triggerScrape);

// GET /api/scraper/health - Get scraper health status
router.get('/health', scraperController.getHealth);

// GET /api/scraper/logs - Get scraper logs
router.get('/logs', scraperController.getLogs);

// GET /api/scraper/market-data - Get latest scraped market data
router.get('/market-data', scraperController.getLatestMarketData);

// GET /api/scraper/index/:code/history - Get index history
router.get('/index/:code/history', scraperController.getIndexHistory);

export default router;
