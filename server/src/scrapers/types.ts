export interface ScrapedStockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  timestamp: Date;
}

export interface ScrapedIndexData {
  code: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}

export interface ScraperConfig {
  url: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  rateLimit?: number; // milliseconds between requests
}

export interface ScraperResult<T> {
  success: boolean;
  data?: T[];
  error?: string;
  timestamp: Date;
  source: string;
}

export enum ScraperStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface ScraperHealthStatus {
  status: ScraperStatus;
  lastRun?: Date;
  lastSuccess?: Date;
  lastError?: string;
  totalRuns: number;
  successCount: number;
  errorCount: number;
  successRate: number;
}
