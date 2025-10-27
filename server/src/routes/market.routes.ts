import { Router, Request, Response } from 'express';
import { StockMarket } from '@prisma/client';

const router = Router();

// GET /api/markets - Get all markets
router.get('/', (req: Request, res: Response) => {
  const markets = Object.values(StockMarket).map(market => ({
    code: market,
    name: market.replace(/_/g, ' ')
  }));

  res.json({
    success: true,
    data: markets
  });
});

export default router;
