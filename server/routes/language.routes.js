import express from 'express';
import LanguageController from '../controllers/language.controller';

const router = express.Router();

router.route('/')
/** GET     /api/languages  Get list of languages */
    .get(LanguageController.list)

    /** POST    /api/languages  Create a single language*/
    .post(LanguageController.create);

router.route('/:id')
/** DELETE 	/api/languages/:id 	Delete a single language */
    .delete(LanguageController.remove)

    .get(LanguageController.get)

    .put(LanguageController.update);

router.route('/name/:name')
    .delete(LanguageController.removeByName);

export default router;