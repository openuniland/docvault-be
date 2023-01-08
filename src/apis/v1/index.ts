import { Router } from 'express';

import authRouter from './auth';
import userRouter from './user';
import subjectRouter from './subject';
import questionRouter from './questions';
import answerRouter from './answer';
import documentRouter from './documents';
import examRouter from './exam';
import userExamRouter from './UserExam';
import userAnswerRouter from './UserAnswer';
import handleRouter from './handle';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/subjects', subjectRouter);
router.use('/questions', questionRouter);
router.use('/answers', answerRouter);
router.use('/document', documentRouter);
router.use('/exams', examRouter);
router.use('/user-exam', userExamRouter);
router.use('/user-answers', userAnswerRouter);
router.use('/handle', handleRouter);

export default router;
