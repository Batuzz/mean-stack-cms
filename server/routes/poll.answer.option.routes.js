import express from 'express';
import PollAnswerOptionController from '../controllers/poll.answer.option.controller';

const router = express.Router();

router.route('/')

/** GET     /api/poll/answer/options  Get list of poll answer options */
    .get(PollAnswerOptionController.list)

/** POST    /api/poll/answer/options  Create a single poll answer option */
    .post(PollAnswerOptionController.create);

router.route('/:id')

/** DELETE 	/api/poll/answer/options/:id 	Delete a single poll answer option */
    .delete(PollAnswerOptionController.remove)

/** GET     /api/poll/answer/options/:id     Get a single poll answer option */
    .get(PollAnswerOptionController.get)

    .put(PollAnswerOptionController.update);

router.route('/name/:name')

    .delete(PollAnswerOptionController.removeByName);

export default router;