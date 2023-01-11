import { Router } from 'express';

import { asyncRouteHandler, authMiddleware } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import * as controller from './controller';

import { UserExamDto, ParamsUserExamDto, UpdateUserExamDto } from './dto/UserExamDto';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getUserExams));

router.post(
  '/',
  authMiddleware,
  validationMiddleware(UserExamDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createUserExam)
);
router.get(
  '/:id',
  authMiddleware,
  validationMiddleware(ParamsUserExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.getUserExamsByUser)
);

router.put(
  '/:id',
  authMiddleware,
  validationMiddleware(UpdateUserExamDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsUserExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateUserExam)
);

router.delete(
  '/:id',
  authMiddleware,
  validationMiddleware(ParamsUserExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteUserExam)
);

export default router;
