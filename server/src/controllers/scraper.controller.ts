import { Request, Response, NextFunction } from 'express';
import { scraperJob } from '../jobs/scraperJob';
import marketDataService from '../services/marketData.service';

export class ScraperController {
  // Trigger manual scrape
  async triggerScrape(req: Request, res: Response, next: NextFunction) {
    try {
      // Run in background
      scraperJob.runScraper().catch((error) => {
        console.error('Background scraper error:', error);
      });

      res.json({
        success: true,
        message: 'Scraper started in background',
      });
    } catch (error) {
      next(error);
    }
  }

  // Get scraper health
  async getHealth(req: Request, res: Response, next: NextFunction) {
    try {
      const health = scraperJob.getHealth();
      const stats = await marketDataService.getScraperStats();

      res.json({
        success: true,
        data: {
          ...health,
          ...stats,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Get scraper logs
  async getLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const logs = await marketDataService.getScraperLogs(limit);

      res.json({
        success: true,
        data: logs,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get latest market data
  async getLatestMarketData(req: Request, res: Response, next: NextFunction) {
    try {
      const indices = await marketDataService.getLatestIndices();

      res.json({
        success: true,
        data: indices,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get index history
  async getIndexHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;

      const history = await marketDataService.getIndexHistory(code, limit);

      res.json({
        success: true,
        data: history,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ScraperController();
