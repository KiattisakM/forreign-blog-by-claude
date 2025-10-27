// API Service Layer for Foreign Stock Blog
// Handles all HTTP requests to the backend API

import type { StockArticle, StockInfo } from '@/types'
import { StockMarket, Sector, Exchange, Currency, ArticleCategory, ReadingLevel } from '@/types'

const API_BASE = '/api';

// API Response wrapper type
interface APIResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// Types for API responses
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readingLevel: string;
  authorId: string;
  stockSymbol: string;
  stockCompanyName: string;
  stockMarket: string | null;
  stockExchange: string | null;
  stockSector: string | null;
  stockCurrency: string | null;
  stockDescription: string | null;
  stockWebsite: string | null;
  stockMarketCap: string | null;
  stockFoundedYear: number | null;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  tags: string[];
  featured: boolean;
  imageUrl: string;
  author?: {
    id: string;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
  };
}

export interface Market {
  id: string;
  name: string;
  code: string;
  flag: string;
}

export interface Sector {
  id: string;
  name: string;
  icon: string;
}

export interface ArticleFilters {
  market?: string;
  markets?: string[];  // Support multiple markets
  sector?: string;
  sectors?: string[];  // Support multiple sectors
  page?: number;
  limit?: number;
  sort?: 'latest' | 'oldest' | 'popular';
}

// Mapper: Convert API Article to StockArticle (frontend format)
const mapArticleToStockArticle = (apiArticle: Article): StockArticle => {
  const stockInfo: StockInfo = {
    symbol: apiArticle.stockSymbol,
    companyName: apiArticle.stockCompanyName,
    market: (apiArticle.stockMarket as StockMarket) || StockMarket.US,
    exchange: (apiArticle.stockExchange as Exchange) || Exchange.NYSE,
    sector: (apiArticle.stockSector as Sector) || Sector.TECHNOLOGY,
    currency: (apiArticle.stockCurrency as Currency) || Currency.USD,
    description: apiArticle.stockDescription || undefined,
    website: apiArticle.stockWebsite || undefined,
    marketCap: apiArticle.stockMarketCap || undefined,
    foundedYear: apiArticle.stockFoundedYear || undefined,
  };

  return {
    id: apiArticle.id,
    title: apiArticle.title,
    slug: apiArticle.slug,
    excerpt: apiArticle.excerpt,
    content: apiArticle.content,
    category: apiArticle.category as ArticleCategory,
    readingLevel: apiArticle.readingLevel as ReadingLevel,
    author: apiArticle.author ? {
      name: apiArticle.author.name,
      avatar: apiArticle.author.avatar || undefined,
      bio: apiArticle.author.bio || undefined,
    } : {
      name: 'Unknown Author',
    },
    publishedAt: new Date(apiArticle.publishedAt),
    updatedAt: new Date(apiArticle.updatedAt),
    readTime: apiArticle.readTime,
    tags: apiArticle.tags,
    featured: apiArticle.featured,
    imageUrl: apiArticle.imageUrl,
    stockInfo,
  };
};

// Helper function to build query params
const buildQueryString = (params: Record<string, any>): string => {
  const filtered = Object.entries(params)
    .filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== '';
    })
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        // For arrays, join with comma: ?sectors=Tech,Finance
        return `${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    });

  return filtered.length > 0 ? `?${filtered.join('&')}` : '';
};

// Helper function for fetch with error handling
const fetchAPI = async <T>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Articles API
export const articlesAPI = {
  /**
   * Get all articles with optional filters
   */
  getAll: async (filters: ArticleFilters = {}): Promise<StockArticle[]> => {
    const queryString = buildQueryString(filters);
    const response = await fetchAPI<APIResponse<Article[]>>(`${API_BASE}/articles${queryString}`);
    return response.data.map(mapArticleToStockArticle);
  },

  /**
   * Get single article by ID
   */
  getById: async (id: string): Promise<StockArticle> => {
    const response = await fetchAPI<APIResponse<Article>>(`${API_BASE}/articles/${id}`);
    return mapArticleToStockArticle(response.data);
  },

  /**
   * Get single article by slug
   */
  getBySlug: async (slug: string): Promise<StockArticle> => {
    const response = await fetchAPI<APIResponse<Article[]>>(`${API_BASE}/articles?slug=${encodeURIComponent(slug)}`);
    if (response.data.length === 0) {
      throw new Error('Article not found');
    }
    return mapArticleToStockArticle(response.data[0]);
  },
};

// Markets API
export const marketsAPI = {
  /**
   * Get all markets
   */
  getAll: async (): Promise<Market[]> => {
    const response = await fetchAPI<APIResponse<Market[]>>(`${API_BASE}/markets`);
    return response.data;
  },
};

// Sectors API
export const sectorsAPI = {
  /**
   * Get all sectors
   */
  getAll: async (): Promise<Sector[]> => {
    const response = await fetchAPI<APIResponse<Sector[]>>(`${API_BASE}/sectors`);
    return response.data;
  },
};

// Combined API export
export const api = {
  articles: articlesAPI,
  markets: marketsAPI,
  sectors: sectorsAPI,
};

export default api;
