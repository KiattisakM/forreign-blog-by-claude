// Market types
export type Market = 'US' | 'EU' | 'ASIA'

export type MarketRegion =
  | 'NYSE'
  | 'NASDAQ'
  | 'LSE'        // London Stock Exchange
  | 'Euronext'
  | 'DAX'        // Frankfurt
  | 'TSE'        // Tokyo
  | 'HKEX'       // Hong Kong
  | 'SGX'        // Singapore

// Article categories
export type ArticleCategory =
  | 'Technical Analysis'
  | 'Fundamental Analysis'
  | 'Market News'
  | 'Investment Strategy'
  | 'Earnings Report'
  | 'Sector Analysis'

// Stock sectors
export type StockSector =
  | 'Technology'
  | 'Healthcare'
  | 'Financial'
  | 'Energy'
  | 'Consumer'
  | 'Industrial'
  | 'Real Estate'
  | 'Materials'
  | 'Utilities'
  | 'Communication'

// Rating types
export type AnalystRating = 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell'

// Stock ticker information
export interface StockTicker {
  symbol: string           // e.g., "AAPL", "GOOGL"
  companyName: string      // e.g., "Apple Inc."
  market: Market
  exchange: MarketRegion
  sector: StockSector
  currentPrice?: number    // Optional - for real-time data later
  priceChange?: number     // Optional - percentage change
  currency: string         // e.g., "USD", "EUR", "JPY"
}

// Price target information
export interface PriceTarget {
  current: number
  target: number
  upside: number           // Percentage upside
  timeframe: string        // e.g., "12 months"
}

// Author information
export interface Author {
  id: string
  name: string
  title: string            // e.g., "Senior Market Analyst"
  avatar?: string
  bio?: string
}

// Stock article interface
export interface StockArticle {
  id: string
  slug: string
  title: string
  summary: string
  content: string

  // Stock-specific fields
  ticker: StockTicker
  category: ArticleCategory
  priceTarget?: PriceTarget
  analystRating?: AnalystRating

  // Metadata
  author: Author
  publishedAt: string      // ISO date string
  updatedAt?: string       // ISO date string
  readingTime: number      // in minutes

  // Media
  featuredImage?: string
  tags: string[]

  // SEO
  metaDescription?: string
  metaKeywords?: string[]

  // Engagement (for future use)
  views?: number
  likes?: number
}

// Market index data (for sidebar widget)
export interface MarketIndex {
  name: string
  symbol: string
  value: number
  change: number           // Percentage
  updatedAt: string
}

// Filter options
export interface ArticleFilters {
  markets?: Market[]
  categories?: ArticleCategory[]
  sectors?: StockSector[]
  search?: string
}

// Pagination
export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}
