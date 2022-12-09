import { Router } from 'express';

import authRouter from './auth';
import userRouter from './user';
import subjectRouter from './subject';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/subjects', subjectRouter);

export default router;
