import { Router } from 'express';

import * as controller from './controller';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import { asyncRouteHandler, authMiddleware } from 'middlewares';
import { UserAnswerDto, UpdateUserAnswerDto, ParamsUserAnswerDto } from './dto/UserAnswerDto';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getUsersAnswers));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(UserAnswerDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createUsersAnswer)
);
router.put(
  '/:id',
  authMiddleware,
  validationMiddleware(ParamsUserAnswerDto, APP_CONSTANTS.params),
  validationMiddleware(UpdateUserAnswerDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.updateUserAnswer)
);
router.delete(
  '/:id',
  authMiddleware,
  validationMiddleware(ParamsUserAnswerDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteUserAnswer)
);

export default router;
