import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import * as controller from './controller';

import { QuestionDto, UpdateQuestionDto, ParamsQuestionDto } from './dto/QuestionDto';

const router = Router();

router.get('/', asyncRouteHandler(controller.getQuestions));

router.post('/', validationMiddleware(QuestionDto, APP_CONSTANTS.body), asyncRouteHandler(controller.createQuestion));

router.put(
  '/:id',
  validationMiddleware(UpdateQuestionDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsQuestionDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateQuestion)
);

router.delete(
  '/:id',
  validationMiddleware(UpdateQuestionDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsQuestionDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteQuestion)
);
export default router;
