import { Router } from 'express';

import authRouter from './auth';
import userRouter from './user';
import subjectRouter from './subject';
<<<<<<< HEAD
import questionRouter from './questions';
import answerRouter from './answer';
import documentRouter from './documents';
import examRouter from './exam';
import userExamRouter from './userExam';
import userAnswerRouter from './userAnswer';
import adminRouter from './admin';
=======
import answerRouter from './answer';
>>>>>>> 651978a (feat[#12] (#38))

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/subjects', subjectRouter);
<<<<<<< HEAD
router.use('/questions', questionRouter);
router.use('/answers', answerRouter);
router.use('/documents', documentRouter);
router.use('/exams', examRouter);
router.use('/user-exams', userExamRouter);
router.use('/user-answers', userAnswerRouter);
router.use('/administrator', adminRouter);
=======
router.use('/answers', answerRouter);
>>>>>>> 651978a (feat[#12] (#38))

export default router;
