import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import * as controller from './controller';

import { ParamsUserExamDto } from '../UserExam/dto/UserExamDto';

const router = Router();

router.get(
  '/:id',
  validationMiddleware(ParamsUserExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.getUserExamById)
);
export default router;
