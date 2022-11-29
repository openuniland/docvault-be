import { Router } from 'express';
import loginRouter from './auth';
import examsRouter from './exams';
import { adminMiddleware , authMiddleware } from 'middlewares/auth';

const router = Router();

router.use('/exams', authMiddleware , adminMiddleware , examsRouter)
router.use('/auth', loginRouter);

export default router;