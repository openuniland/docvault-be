import { Router } from 'express';

import authRouter from './auth';
import userRouter from './user';
import subjectRouter from './subject';
import questionRouter from './questions';
import answerRouter from './answer';
import documentRouter from './documents';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/subjects', subjectRouter);
router.use('/questions', questionRouter);
router.use('/answers', answerRouter);
router.use('/document', documentRouter);

export default router;
