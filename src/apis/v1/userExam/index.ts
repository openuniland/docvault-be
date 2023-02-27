import { Router } from 'express';

import { asyncRouteHandler, authMiddleware } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import * as controller from './controller';

import { UserExamDto, ParamsUserExamDto, SubmitTheExamDto } from './dto/UserExamDto';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getAllUserExamsOfUser));

router.get('/:id', authMiddleware, asyncRouteHandler(controller.getUserExamOfUser));

router.post(
  '/',
  authMiddleware,
  validationMiddleware(UserExamDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createUserExam)
);

router.delete(
  '/:id',
  authMiddleware,
  validationMiddleware(ParamsUserExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteUserExam)
);

router.post(
  '/submit',
  authMiddleware,
  validationMiddleware(SubmitTheExamDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.submitTheExam)
);

export default router;
