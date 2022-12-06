import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import * as controller from './controller';

const router = Router();

router.post('/users', asyncRouteHandler(controller.createUser));

export default router;
