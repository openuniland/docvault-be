import { Router } from 'express';

import * as controller from './controller';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import { asyncRouteHandler, authMiddleware } from 'middlewares';
import { ExamDto, ParamsExamDto, QueryExamDto, UpdateExamDto } from './dto/ExamDto';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getExams));
router.get(
  '/subjectname',
  authMiddleware,
  validationMiddleware(QueryExamDto, APP_CONSTANTS.query),
  asyncRouteHandler(controller.getExamBySubject)
);
router.get(
  '/:id',
<<<<<<< HEAD
  authMiddleware,
=======
>>>>>>> 4920e19 (feat/#48 (#58))
  validationMiddleware(ParamsExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.getExamById)
);

<<<<<<< HEAD
router.post(
  '/',
  authMiddleware,
  validationMiddleware(ExamDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createExam)
);
=======
router.post('/', validationMiddleware(ExamDto, APP_CONSTANTS.body), asyncRouteHandler(controller.createExam));
>>>>>>> 4920e19 (feat/#48 (#58))
router.put(
  '/:id',
  authMiddleware,
  validationMiddleware(UpdateExamDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateExam)
);
router.delete(
  '/:id',
  authMiddleware,
  validationMiddleware(ParamsExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteExam)
);

export default router;
