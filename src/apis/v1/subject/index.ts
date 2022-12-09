import { Router } from 'express';

import * as controller from './controller';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import { asyncRouteHandler } from 'middlewares';
import { UpdateSubjectDto, SubjectDto, ParamsSubjectDto } from './dto/SubjectDto';

const router = Router();

router.put(
  '/:id',
  validationMiddleware(UpdateSubjectDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsSubjectDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateSubject)
);
router.get('/', asyncRouteHandler(controller.getSubjects));
router.post('/', validationMiddleware(SubjectDto, APP_CONSTANTS.body), asyncRouteHandler(controller.createSubject));
router.delete(
  '/:id',
  validationMiddleware(ParamsSubjectDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteSubject)
);

export default router;
