import { Router } from 'express';

import * as controller from './controller';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import { asyncRouteHandler } from 'middlewares';
import { ExamDto, ParamsExamDto, QueryExamDto, UpdateExamDto } from './dto/ExamDto';

const router = Router();

router.get('/', asyncRouteHandler(controller.getExams));
router.get(
  '/subjectname',
  validationMiddleware(QueryExamDto, APP_CONSTANTS.query),
  asyncRouteHandler(controller.getExamBySubject)
);
router.get(
  '/:id',
  validationMiddleware(ParamsExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.getExamById)
);

router.post('/', validationMiddleware(ExamDto, APP_CONSTANTS.body), asyncRouteHandler(controller.createExam));
router.put(
  '/:id',
  validationMiddleware(UpdateExamDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateExam)
);
router.delete(
  '/:id',
  validationMiddleware(ParamsExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteExam)
);

export default router;
