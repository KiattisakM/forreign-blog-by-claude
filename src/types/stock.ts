/**
 * Stock market regions
 */
export enum StockMarket {
  US = 'US',
  EU = 'EU',
  ASIA = 'ASIA',
  UK = 'UK',
  CANADA = 'CANADA',
  AUSTRALIA = 'AUSTRALIA',
}

/**
 * Stock market sectors
 */
export enum Sector {
  TECHNOLOGY = 'Technology',
  FINANCE = 'Finance',
  HEALTHCARE = 'Healthcare',
  ENERGY = 'Energy',
  CONSUMER = 'Consumer',
  INDUSTRIALS = 'Industrials',
  MATERIALS = 'Materials',
  UTILITIES = 'Utilities',
  REAL_ESTATE = 'Real Estate',
  COMMUNICATIONS = 'Communications',
}

/**
 * Stock exchanges
 */
export enum Exchange {
  NYSE = 'NYSE',
  NASDAQ = 'NASDAQ',
  LSE = 'LSE',
  EURONEXT = 'Euronext',
  TSE = 'TSE',
  HKEX = 'HKEX',
  SSE = 'SSE',
  ASX = 'ASX',
  TSX = 'TSX',
}

/**
 * Currency codes
 */
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CNY = 'CNY',
  AUD = 'AUD',
  CAD = 'CAD',
  HKD = 'HKD',
}

/**
 * Stock information
 */
export interface StockInfo {
  symbol: string
  companyName: string
  market: StockMarket
  exchange: Exchange
  sector: Sector
  currency: Currency
  description?: string
  website?: string
  marketCap?: string
  foundedYear?: number
}

/**
 * Stock price data (optional for future use)
 */
export interface StockPrice {
  symbol: string
  currentPrice: number
  change: number
  changePercent: number
  previousClose: number
  open: number
  high: number
  low: number
  volume: number
  lastUpdated: Date
}

/**
 * Helper type for market filtering
 */
export type MarketFilter = StockMarket | 'ALL'

/**
 * Helper type for sector filtering
 */
export type SectorFilter = Sector | 'ALL'
