import { Router } from 'express';
import examsRouter from './exams';
import { adminMiddleware , authMiddleware } from 'middlewares/auth';

const router = Router();

router.use('/exams', authMiddleware , adminMiddleware , examsRouter)

export default router;