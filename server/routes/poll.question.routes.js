import express from 'express';
import PollQuestionController from '../controllers/poll.question.controller';

const router = express.Router();

router.route('/')

/** GET     /api/poll/questions  Get list of poll questions */
    .get(PollQuestionController.list)

/** POST    /api/poll/questions  Create a single poll question */
    .post(PollQuestionController.create);

router.route('/:id')

/** DELETE 	/api/poll/questions/:poll_question_id 	Delete a single poll question */
    .delete(PollQuestionController.remove)

/** GET     /api/poll/questions/:poll_question_id     Get a single poll question */
    .get(PollQuestionController.get)

    .put(PollQuestionController.update);

router.route('/name/:name')

    .delete(PollQuestionController.removeByName);

export default router;