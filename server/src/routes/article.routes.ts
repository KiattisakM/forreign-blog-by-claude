import { Router } from 'express';
import articleController from '../controllers/article.controller';

const router = Router();

// GET /api/articles - Get all articles with filtering and pagination
router.get('/', articleController.getArticles);

// GET /api/articles/:slug - Get single article by slug
router.get('/:slug', articleController.getArticleBySlug);

// POST /api/articles - Create new article (admin only - skip auth for now)
router.post('/', articleController.createArticle);

// PUT /api/articles/:id - Update article (admin only - skip auth for now)
router.put('/:id', articleController.updateArticle);

// DELETE /api/articles/:id - Delete article (admin only - skip auth for now)
router.delete('/:id', articleController.deleteArticle);

export default router;
