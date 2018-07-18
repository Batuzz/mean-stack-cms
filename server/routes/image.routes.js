import express from 'express';
import ImageController from '../controllers/image.controller';

const router = express.Router();

router.route('/')

/** GET     /api/images  Get list of images */
    .get(ImageController.list)

/** POST    /api/images  Create a single image */
    .post(ImageController.create);

router.route('/:id')

/** DELETE 	/api/images/:id 	Delete a single image */
    .delete(ImageController.remove)

/** GET     /api/images/:id     Get a single image */
    .get(ImageController.get)

    .put(ImageController.update);

router.route('/url/:url')

    .delete(ImageController.removeByURL);

export default router;