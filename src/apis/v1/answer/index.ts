import { Router } from 'express';

import * as controller from './controller';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import { asyncRouteHandler, authMiddleware } from 'middlewares';
import { AnswerDto, UpdateAnswerDto, ParamsAnswerDto } from './dto/AnswerDto';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getAnswers));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(AnswerDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createAnswer)
);
router.put(
  '/:id',
  authMiddleware,
  validationMiddleware(UpdateAnswerDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsAnswerDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateAnswer)
);
router.delete(
  '/:id',
  authMiddleware,
  validationMiddleware(ParamsAnswerDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteAnswer)
);

export default router;
