import { Router } from 'express';
import loginRouter from './auth';

const router = Router();

router.use('/auth', loginRouter);

export default router;
