import express from 'express';
import TranslationController from '../controllers/translation.controller';

const router = express.Router();

router.route('/')
/** GET     /api/translations  Get list of translations */
    .get(TranslationController.list)

/** POST    /api/translations  Create a single translation*/
    .post(TranslationController.create);

router.route('/:id')
/** DELETE 	/api/translations/:translation_id 	Delete a single translation */
    .delete(TranslationController.remove)

    .get(TranslationController.get)

    .put(TranslationController.update);

router.route('/name/:name')
/** GET /api/translations/name/:name    Get list of translations with such name */
    .get(TranslationController.listByName)

    .delete(TranslationController.removeByName);

export default router;