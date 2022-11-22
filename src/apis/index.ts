import { Router } from 'express';
import healthRouter from './health';
import v1Router from './v1';
import {asyncRouteHandler} from 'middlewares' 

const router = Router();

router.use('/health', healthRouter);
router.use('/v1',);

export default router;
