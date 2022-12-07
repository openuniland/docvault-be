import { Router } from 'express';

import authRouter from './auth';
import examsRouter from './exams';
import userRouter from './users';

const router = Router();

router.use('/exams', examsRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
