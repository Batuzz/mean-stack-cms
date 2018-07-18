import express from 'express';
import PollController from '../controllers/poll.controller';

const router = express.Router();

router.route('/')

/** GET     /api/polls  Get list of polls */
    .get(PollController.list)

/** POST    /api/polls  Create a single poll */
    .post(PollController.create);

router.route('/:id')

/** DELETE 	/api/polls/:poll_id 	Delete a single poll */
    .delete(PollController.remove)

/** GET     /api/polls/:poll_id     Get a single poll */
    .get(PollController.get)

    .put(PollController.update);

router.route('/name/:name')

/** GET /api/polls/name/:name    Get poll with such name */
    .get(PollController.getByName)

    .delete(PollController.removeByName);


export default router;