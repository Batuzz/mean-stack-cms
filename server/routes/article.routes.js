import express from 'express';
import ArticleController from '../controllers/article.controller';

const router = express.Router();

router.route('/')

/** GET     /api/articles  Get list of articles */
    .get(ArticleController.list)

/** POST    /api/articles  Create a single article */
    .post(ArticleController.create);

router.route('/:id')

/** DELETE 	/api/articles/:id 	Delete a single article */
    .delete(ArticleController.remove)

/** GET     /api/articles/:id     Get a single article */
    .get(ArticleController.get)

    .put(ArticleController.update);

router.route('/name/:name')

/** GET /api/articles/name/:name    Get article with such name */
    .get(ArticleController.getByName)

/** DELETE /api/articles/name/:name    Delete article with such name */
    .delete(ArticleController.removeByName);

export default router;