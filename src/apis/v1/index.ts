import { Router } from 'express';

import authRouter from './auth';
import userRouter from './user';
import subjectRouter from './subject';
import questionRouter from './questions';
import documentRouter from './documents';
import examRouter from './exam';
import userExamRouter from './userExam';
import userAnswerRouter from './userAnswer';
import adminRouter from './admin';
import popupRouter from './popup';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/subjects', subjectRouter);
router.use('/questions', questionRouter);
router.use('/documents', documentRouter);
router.use('/exams', examRouter);
router.use('/user-exams', userExamRouter);
router.use('/user-answers', userAnswerRouter);
router.use('/administrator', adminRouter);
router.use('/popup', popupRouter);

export default router;
