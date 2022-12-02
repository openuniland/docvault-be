import { Router } from 'express';
import { login, saveUser } from './controller';
import { asyncRouteHandler } from 'middlewares';

const router = Router();

router.post('/login', asyncRouteHandler(login));
router.post('/saveUser', asyncRouteHandler(saveUser));

export default router;
