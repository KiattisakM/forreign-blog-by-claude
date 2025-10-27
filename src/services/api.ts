// API Service Layer for Foreign Stock Blog
// Handles all HTTP requests to the backend API

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
  sector?: string;
  page?: number;
  limit?: number;
  sort?: 'latest' | 'oldest' | 'popular';
}

// Helper function to build query params
const buildQueryString = (params: Record<string, any>): string => {
  const filtered = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);

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
  getAll: async (filters: ArticleFilters = {}): Promise<Article[]> => {
    const queryString = buildQueryString(filters);
    const response = await fetchAPI<APIResponse<Article[]>>(`${API_BASE}/articles${queryString}`);
    return response.data;
  },

  /**
   * Get single article by ID
   */
  getById: async (id: string): Promise<Article> => {
    const response = await fetchAPI<APIResponse<Article>>(`${API_BASE}/articles/${id}`);
    return response.data;
  },

  /**
   * Get single article by slug
   */
  getBySlug: async (slug: string): Promise<Article> => {
    const response = await fetchAPI<APIResponse<Article[]>>(`${API_BASE}/articles?slug=${encodeURIComponent(slug)}`);
    if (response.data.length === 0) {
      throw new Error('Article not found');
    }
    return response.data[0];
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
