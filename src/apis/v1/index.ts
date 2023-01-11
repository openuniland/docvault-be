import { Router } from 'express';

import authRouter from './auth';
import userRouter from './user';
import subjectRouter from './subject';
import questionRouter from './questions';
import answerRouter from './answer';
import documentRouter from './documents';
import examRouter from './exam';
import userExamRouter from './userExam';
import userAnswerRouter from './userAnswer';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/subjects', subjectRouter);
router.use('/questions', questionRouter);
router.use('/answers', answerRouter);
router.use('/documents', documentRouter);
router.use('/exams', examRouter);
router.use('/user-exams', userExamRouter);
router.use('/user-answers', userAnswerRouter);

export default router;
