import express from 'express';
import PollUserAnswerController from '../controllers/poll.user.answer.controller';

const router = express.Router();

router.route('/')

/** GET     /api/poll/user/answers          Get list of poll user answers */
    .get(PollUserAnswerController.list)

/** POST    /api/poll/user/answers          Create a single poll user answer */
    .post(PollUserAnswerController.create);

router.route('/:id')

/** DELETE 	/api/poll/user/answers/:id 	    Delete a single poll user answer */
    .delete(PollUserAnswerController.remove)

/** GET     /api/poll/user/answers/:id      Get a single poll user answer */
    .get(PollUserAnswerController.get)

    .put(PollUserAnswerController.update);

router.route('/chart/:name')

    .get(PollUserAnswerController.getChartData);

export default router;