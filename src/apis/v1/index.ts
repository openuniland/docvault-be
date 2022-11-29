import { Router } from 'express';
import loginRouter from './auth';
import examsRouter from './exams'

const router = Router();

router.use('/auth', loginRouter);
router.use('/exams', examsRouter);

export default router;
