import { Router } from 'express';
import * as controller from './controller';
import { asyncRouteHandler } from 'middlewares';

const router = Router();

router.post('/login', asyncRouteHandler(controller.login));

export default router;
