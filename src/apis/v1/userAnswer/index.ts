import { Router } from 'express';

import * as controller from './controller';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import { asyncRouteHandler, authMiddleware } from 'middlewares';
import { UpdateUserAnswerDto, ParamsUserAnswerDto } from './dto/UserAnswerDto';

const router = Router();

router.put(
  '/:id',
  authMiddleware,
  validationMiddleware(ParamsUserAnswerDto, APP_CONSTANTS.params),
  validationMiddleware(UpdateUserAnswerDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.updateUserAnswer)
);

export default router;
