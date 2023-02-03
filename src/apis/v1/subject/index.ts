import { Router } from 'express';

import * as controller from './controller';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import { adminMiddleware, asyncRouteHandler, authMiddleware } from 'middlewares';
import { UpdateSubjectDto, SubjectDto, ParamsSubjectDto, QuerySubjectDto } from './dto/SubjectDto';

const router = Router();

router.put(
  '/:id',
  authMiddleware,
  validationMiddleware(UpdateSubjectDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsSubjectDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateSubject)
);

router.get(
  '/',
  authMiddleware,
  validationMiddleware(QuerySubjectDto, APP_CONSTANTS.query),
  asyncRouteHandler(controller.getSubjects)
);
router.post(
  '/',
  authMiddleware,
  validationMiddleware(SubjectDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createSubject)
);
router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(ParamsSubjectDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteSubject)
);

export default router;
