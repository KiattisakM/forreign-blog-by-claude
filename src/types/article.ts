import { StockInfo } from './stock'

/**
 * Article category types
 */
export enum ArticleCategory {
  ANALYSIS = 'Analysis',
  NEWS = 'News',
  EDUCATION = 'Education',
  OPINION = 'Opinion',
  EARNINGS = 'Earnings Report',
  MARKET_UPDATE = 'Market Update',
}

/**
 * Article reading difficulty
 */
export enum ReadingLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

/**
 * Base article interface
 */
export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: ArticleCategory
  readingLevel: ReadingLevel
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  publishedAt: Date
  updatedAt?: Date
  readTime: number // in minutes
  tags: string[]
  featured: boolean
  imageUrl?: string
  imageAlt?: string
}

/**
 * Stock-specific article that extends base article
 */
export interface StockArticle extends Article {
  stockInfo: StockInfo
  relatedStocks?: StockInfo[] // Additional stocks mentioned in the article
  priceTarget?: {
    target: number
    timeframe: string // e.g., "12 months"
  }
  sentiment?: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
}

/**
 * Article filters for search and filtering
 */
export interface ArticleFilters {
  market?: string[]
  sector?: string[]
  category?: ArticleCategory[]
  readingLevel?: ReadingLevel[]
  tags?: string[]
  search?: string
  featured?: boolean
  dateFrom?: Date
  dateTo?: Date
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  hasNext: boolean
  hasPrevious: boolean
}

/**
 * Paginated article response
 */
export interface PaginatedArticles {
  articles: StockArticle[]
  meta: PaginationMeta
}
