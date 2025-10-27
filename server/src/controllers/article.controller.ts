import { Request, Response, NextFunction } from 'express';
import articleService from '../services/article.service';
import { AppError } from '../middleware/error.middleware';
import { ArticleFilters, PaginationParams } from '../types/api.types';
import { StockMarket, Sector, ArticleCategory, ReadingLevel } from '@prisma/client';

export class ArticleController {
  async getArticles(req: Request, res: Response, next: NextFunction) {
    try {
      // Parse filters
      const filters: ArticleFilters = {
        market: req.query.market ? (Array.isArray(req.query.market) ? req.query.market as StockMarket[] : [req.query.market as StockMarket]) : undefined,
        sector: req.query.sector ? (Array.isArray(req.query.sector) ? req.query.sector as Sector[] : [req.query.sector as Sector]) : undefined,
        category: req.query.category ? (Array.isArray(req.query.category) ? req.query.category as ArticleCategory[] : [req.query.category as ArticleCategory]) : undefined,
        readingLevel: req.query.readingLevel ? (Array.isArray(req.query.readingLevel) ? req.query.readingLevel as ReadingLevel[] : [req.query.readingLevel as ReadingLevel]) : undefined,
        search: req.query.search as string,
        featured: req.query.featured === 'true',
        tags: req.query.tags ? (Array.isArray(req.query.tags) ? req.query.tags as string[] : [req.query.tags as string]) : undefined
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
