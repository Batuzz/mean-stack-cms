import express from 'express';
import SectionController from '../controllers/section.controller';

const router = express.Router();

router.route('/')

/** GET     /api/sections  Get list of sections */
    .get(SectionController.list)

/** POST    /api/sections  Create a single section */
    .post(SectionController.create);

router.route('/:id')

/** DELETE 	/api/sections/:id 	Delete a single section */
    .delete(SectionController.remove)

/** GET     /api/sections/:id     Get a single section */
    .get(SectionController.get)

    .put(SectionController.update);

router.route('/name/:name')

    .delete(SectionController.removeByName);

export default router;