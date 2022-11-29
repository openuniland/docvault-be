import { Router } from 'express';
import healthRouter from './health';
import v1Router from './v1';


const router = Router();
import { asyncRouteHandler } from 'middlewares';

router.use('/health', healthRouter);
router.use('/v1', v1Router);

export default router;

