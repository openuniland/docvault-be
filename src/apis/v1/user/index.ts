import { Router } from 'express';

import { adminMiddleware, asyncRouteHandler, authMiddleware } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import * as controller from './controller';
import { UserDto, UpdateUserDto, ParamsUserDto } from './dto/UserDto';

const router = Router();

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(UserDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createUser)
);

router.get('/', authMiddleware, adminMiddleware, asyncRouteHandler(controller.getUsers));
router.get('/email', authMiddleware, adminMiddleware, asyncRouteHandler(controller.getUserByEmail));

router.get('/email', authMiddleware, adminMiddleware, asyncRouteHandler(controller.getUserByEmail));

router.patch(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(ParamsUserDto, APP_CONSTANTS.params),
  validationMiddleware(UpdateUserDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.updateUser)
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(ParamsUserDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteUser)
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(ParamsUserDto, APP_CONSTANTS.params),
  validationMiddleware(UpdateUserDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.updateUser)
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(ParamsUserDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteUser)
);

export default router;
