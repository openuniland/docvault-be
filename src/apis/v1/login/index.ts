import { Router } from 'express';
import { login } from './controller';
import { asyncRouteHandler } from 'middlewares';

const router = Router();

router.post('/', asyncRouteHandler(login));

export default router;