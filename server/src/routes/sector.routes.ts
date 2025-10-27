import { Router, Request, Response } from 'express';
import { Sector } from '@prisma/client';

const router = Router();

// GET /api/sectors - Get all sectors
router.get('/', (req: Request, res: Response) => {
  const sectors = Object.values(Sector).map(sector => ({
    id: sector,
    name: sector.replace(/_/g, ' ')
  }));

  res.json({
    success: true,
    data: sectors
  });
});

export default router;
