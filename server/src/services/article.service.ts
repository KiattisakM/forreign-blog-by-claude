import prisma from '../utils/prisma';
import { ArticleFilters, PaginationParams, PaginationMeta } from '../types/api.types';
import { Article, Prisma } from '@prisma/client';

export class ArticleService {
  async getArticles(filters: ArticleFilters, pagination: PaginationParams) {
    const page = pagination.page || 1;
    const limit = Math.min(pagination.limit || 10, 100); // Max 100 items per page
    const skip = (page - 1) * limit;
    const sortBy = pagination.sortBy || 'publishedAt';
    const order = pagination.order || 'desc';

    // Build where clause
    const where: Prisma.ArticleWhereInput = {};

    if (filters.market && filters.market.length > 0) {
      where.stockMarket = { in: filters.market };
    }

    if (filters.sector && filters.sector.length > 0) {
      where.stockSector = { in: filters.sector };
    }

    if (filters.category && filters.category.length > 0) {
      where.category = { in: filters.category };
    }

    if (filters.readingLevel && filters.readingLevel.length > 0) {
      where.readingLevel = { in: filters.readingLevel };
    }

    if (filters.featured !== undefined) {
      where.featured = filters.featured;
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { excerpt: { contains: filters.search, mode: 'insensitive' } },
        { stockCompanyName: { contains: filters.search, mode: 'insensitive' } },
        { stockSymbol: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    if (filters.tags && filters.tags.length > 0) {
      where.tags = { hasSome: filters.tags };
    }

    // Get total count
    const total = await prisma.article.count({ where });

    // Get articles
    const articles = await prisma.article.findMany({
      where,
      include: {
        author: true
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: order }
    });

    // Build pagination meta
    const meta: PaginationMeta = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      pageSize: limit,
      totalItems: total,
      hasNext: page < Math.ceil(total / limit),
      hasPrevious: page > 1
    };

    return { articles, meta };
  }

  async getArticleBySlug(slug: string) {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author: true
      }
    });

    return article;
  }

  async createArticle(data: Prisma.ArticleCreateInput) {
    return await prisma.article.create({
      data,
      include: {
        author: true
      }
    });
  }

  async updateArticle(id: string, data: Prisma.ArticleUpdateInput) {
    return await prisma.article.update({
      where: { id },
      data,
      include: {
        author: true
      }
    });
  }

  async deleteArticle(id: string) {
    return await prisma.article.delete({
      where: { id }
    });
  }
}

export default new ArticleService();
