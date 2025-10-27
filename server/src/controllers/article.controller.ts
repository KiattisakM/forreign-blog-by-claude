import { Request, Response, NextFunction } from 'express';
import articleService from '../services/article.service';
import { AppError } from '../middleware/error.middleware';
import { ArticleFilters, PaginationParams } from '../types/api.types';
import { StockMarket, Sector, ArticleCategory, ReadingLevel } from '@prisma/client';

export class ArticleController {
  async getArticles(req: Request, res: Response, next: NextFunction) {
    try {
      // Helper function to parse query param (supports comma-separated values)
      const parseQueryParam = (param: any): string[] | undefined => {
        if (!param) return undefined;
        if (Array.isArray(param)) return param as string[];
        // Split comma-separated values
        return (param as string).split(',').map(v => v.trim()).filter(Boolean);
      };

      // Parse filters
      const filters: ArticleFilters = {
        // Support both singular (market) and plural (markets)
        // Convert to uppercase to match Prisma enum values
        market: parseQueryParam(req.query.market || req.query.markets)?.map(v => v.toUpperCase()) as StockMarket[] | undefined,
        // Support both singular (sector) and plural (sectors)
        // Convert to uppercase to match Prisma enum values
        sector: parseQueryParam(req.query.sector || req.query.sectors)?.map(v => v.toUpperCase()) as Sector[] | undefined,
        category: parseQueryParam(req.query.category)?.map(v => v.toUpperCase()) as ArticleCategory[] | undefined,
        readingLevel: parseQueryParam(req.query.readingLevel)?.map(v => v.toUpperCase()) as ReadingLevel[] | undefined,
        search: req.query.search as string,
        featured: req.query.featured !== undefined ? req.query.featured === 'true' : undefined,
        tags: parseQueryParam(req.query.tags)
      };

      // Parse pagination
      const pagination: PaginationParams = {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        sortBy: req.query.sortBy as string,
        order: req.query.order === 'asc' ? 'asc' : 'desc'
      };

      const result = await articleService.getArticles(filters, pagination);

      res.json({
        success: true,
        data: result.articles,
        meta: result.meta
      });
    } catch (error) {
      next(error);
    }
  }

  async getArticleBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const article = await articleService.getArticleBySlug(slug);

      if (!article) {
        throw new AppError('Article not found', 404);
      }

      res.json({
        success: true,
        data: article
      });
    } catch (error) {
      next(error);
    }
  }

  async createArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const article = await articleService.createArticle(req.body);

      res.status(201).json({
        success: true,
        data: article
      });
    } catch (error) {
      next(error);
    }
  }

  async updateArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const article = await articleService.updateArticle(id, req.body);

      res.json({
        success: true,
        data: article
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await articleService.deleteArticle(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new ArticleController();
