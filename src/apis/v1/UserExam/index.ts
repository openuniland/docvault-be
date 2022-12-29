import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import * as controller from './controller';

import { UserExamDto, UpdateUserExamDto, ParamsUserExamDto } from './dto/UserExamDto';

const router = Router();

router.get('/', asyncRouteHandler(controller.getUserExams));

router.post('/', validationMiddleware(UserExamDto, APP_CONSTANTS.body), asyncRouteHandler(controller.createUserExam));

router.put(
  '/:id',
  validationMiddleware(UpdateUserExamDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsUserExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateUserExam)
);

router.delete(
  '/:id',
  validationMiddleware(ParamsUserExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteUserExam)
);

export default router;
