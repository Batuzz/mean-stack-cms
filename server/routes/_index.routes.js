import express from 'express';
import userRoutes from './user.routes';
import languageRoutes from './language.routes';
import translationRoutes from './translation.routes';
import menuRoutes from './menu.routes';
import submenuRoutes from './submenu.routes';
import pollRoutes from './poll.routes';
import pollQuestionRoutes from './poll.question.routes';
import pollAnswerOptionRoutes from './poll.answer.option.routes';
import pollUserAnswerRoutes from './poll.user.answer.routes';
import sectionRoutes from './section.routes';
import articleRoutes from './article.routes';
import uploadRoutes from './upload.routes';
import imageRoutes from './image.routes';

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);

router.get('/', function(req, res) {
    res.sendfile('./client/src/index.html');
});


router.use('/api/users', userRoutes);

router.use('/api/languages', languageRoutes);

router.use('/api/translations', translationRoutes);

router.use('/api/menus', menuRoutes);

router.use('/api/submenus', submenuRoutes);

router.use('/api/polls', pollRoutes);

router.use('/api/poll/questions', pollQuestionRoutes);

router.use('/api/poll/answer/options', pollAnswerOptionRoutes);

router.use('/api/poll/user/answers', pollUserAnswerRoutes);

router.use('/api/sections', sectionRoutes);

router.use('/api/articles', articleRoutes);

router.use('/api/upload', uploadRoutes);

router.use('/api/images', imageRoutes);

export default router;