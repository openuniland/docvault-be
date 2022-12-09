import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import * as controller from './controller';
import { UserDto } from './dto/UserDto';

const router = Router();

router.post('/', validationMiddleware(UserDto, APP_CONSTANTS.body), asyncRouteHandler(controller.createUser));
router.get('/', asyncRouteHandler(controller.getUsers));

export default router;
