import express from 'express';
import MenuController from '../controllers/menu.controller';

const router = express.Router();

router.route('/')
/** GET     /api/menus  Get list of menus */
    .get(MenuController.list)

/** POST    /api/menus  Create a single menu*/
    .post(MenuController.create);

router.route('/:id')
/** DELETE 	/api/menus/:menu_id 	Delete a single menu */
    .delete(MenuController.remove)

/** GET     /api/menus/:menu_id     Get a single menu*/
    .get(MenuController.get)

    .put(MenuController.update);

router.route('/name/:name')
    .delete(MenuController.removeByName);

export default router;