import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import articleRoutes from './routes/article.routes';
import marketRoutes from './routes/market.routes';
import sectorRoutes from './routes/sector.routes';
import scraperRoutes from './routes/scraper.routes';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';
import { scraperJob } from './jobs/scraperJob';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_PREFIX = process.env.API_PREFIX || '/api';

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use(`${API_PREFIX}/articles`, articleRoutes);
app.use(`${API_PREFIX}/markets`, marketRoutes);
app.use(`${API_PREFIX}/sectors`, sectorRoutes);
app.use(`${API_PREFIX}/scraper`, scraperRoutes);

// Error handlers (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API available at http://localhost:${PORT}${API_PREFIX}`);
  console.log(`🏥 Health check at http://localhost:${PORT}/health`);

  // Start scraper scheduler if enabled
  if (process.env.SCRAPER_ENABLED === 'true') {
    const schedule = process.env.SCRAPER_SCHEDULE || '0 * * * *'; // Default: every hour
    console.log('🤖 Starting scraper scheduler...');
    scraperJob.start(schedule);
  } else {
    console.log('⏸️  Scraper scheduler disabled (set SCRAPER_ENABLED=true to enable)');
  }
});

export default app;
