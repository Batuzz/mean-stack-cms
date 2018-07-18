import express from 'express';
import SubmenuController from '../controllers/submenu.controller';

const router = express.Router();

router.route('/')

/** GET     /api/submenus               Get list of submenus */
    .get(SubmenuController.list)

/** POST    /api/submenus               Create a single submenu*/
    .post(SubmenuController.create);



router.route('/:id')

/** DELETE 	/api/submenus/:menu_id 	    Delete a single submenu */
    .delete(SubmenuController.remove)

/** GET     /api/submenus/:menu_id      Get a single submenu*/
    .get(SubmenuController.get)

    .put(SubmenuController.update);

router.route('/name/:name')

    .delete(SubmenuController.removeByName);

export default router;