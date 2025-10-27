import { StockMarket, Sector, ArticleCategory, ReadingLevel } from '@prisma/client';

export interface ArticleFilters {
  market?: StockMarket[];
  sector?: Sector[];
  category?: ArticleCategory[];
  readingLevel?: ReadingLevel[];
  search?: string;
  featured?: boolean;
  tags?: string[];
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: PaginationMeta;
}
