import express from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.route('/')
    /** POST    /api/users  Create a single user */
    .post(UserController.create);


router.route('/login')

    .post(UserController.login);

router.route('/:id')
/** DELETE 	/api/users/:id 	Delete a single user */
    .delete(UserController.remove)

    .put(UserController.update)

    .get(UserController.load);

export default router;