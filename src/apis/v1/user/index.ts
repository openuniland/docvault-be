import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import * as controller from './controller';
import { UserDto, UpdateUserDto, ParamsUserDto } from './dto/UserDto';

const router = Router();

router.post('/', validationMiddleware(UserDto, APP_CONSTANTS.body), asyncRouteHandler(controller.createUser));
router.get('/', asyncRouteHandler(controller.getUsers));
router.put(
  '/:id',
  validationMiddleware(ParamsUserDto, APP_CONSTANTS.params),
  validationMiddleware(UpdateUserDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.updateUser)
);
router.delete(
  '/:id',
  validationMiddleware(ParamsUserDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteUser)
);

export default router;
