import { Router } from 'express';

import { asyncRouteHandler, authMiddleware, adminMiddleware } from 'middlewares';
import * as controller from './controller';

const router = Router();

router.get('/user-exams', authMiddleware, adminMiddleware, asyncRouteHandler(controller.getAllUserExams));

export default router;
