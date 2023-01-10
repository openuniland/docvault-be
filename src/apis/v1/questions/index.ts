import { Router } from 'express';

import { asyncRouteHandler, authMiddleware } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import * as controller from './controller';

import { QuestionDto, UpdateQuestionDto, ParamsQuestionDto } from './dto/QuestionDto';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getQuestions));

router.post(
  '/',
  authMiddleware,
  validationMiddleware(QuestionDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createQuestion)
);

router.put(
  '/:id',
  authMiddleware,
  validationMiddleware(UpdateQuestionDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsQuestionDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateQuestion)
);

router.delete(
  '/:id',
  authMiddleware,
  validationMiddleware(UpdateQuestionDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsQuestionDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteQuestion)
);
export default router;
