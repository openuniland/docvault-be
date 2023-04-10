import { Router } from 'express';

import * as controller from './controller';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import { asyncRouteHandler, authMiddleware } from 'middlewares';
import { ExamDto, ParamsExamDto, UpdateExamByOwnerDto } from './dto/ExamDto';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getExams));

router.get('/draft-exam', authMiddleware, asyncRouteHandler(controller.getDraftExam));

router.get('/owner', authMiddleware, asyncRouteHandler(controller.getExamsByOwner));

router.get(
  '/:id',
  authMiddleware,
  validationMiddleware(ParamsExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.getExamById)
);

router.get(
  '/subject/:id',
  authMiddleware,
  validationMiddleware(ParamsExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.getExamsBySubjectId)
);

router.post(
  '/',
  authMiddleware,
  validationMiddleware(ExamDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createExam)
);

router.put(
  '/:id',
  authMiddleware,
  validationMiddleware(UpdateExamByOwnerDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateExamByOwner)
);
router.delete(
  '/:id',
  authMiddleware,
  validationMiddleware(ParamsExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteExam)
);

export default router;
