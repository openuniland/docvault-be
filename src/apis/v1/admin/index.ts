import { Router } from 'express';

import { asyncRouteHandler, authMiddleware, adminMiddleware } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import {
  CreateDocumentRequestForAdmin,
  UpdateDocumentByAdminDto,
  ParamsDocumentDto,
} from '../documents/dto/DocumentsDto';
import { ParamsExamDto, UpdateExamByAdminDto } from '../exam/dto/ExamDto';
import * as controller from './controller';

const router = Router();

router.get('/user-exams', authMiddleware, adminMiddleware, asyncRouteHandler(controller.getAllUserExamsByAdmin));
router.get('/documents', authMiddleware, adminMiddleware, asyncRouteHandler(controller.getDocumentsByAdmin));
router.patch(
  '/documents/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(UpdateDocumentByAdminDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsDocumentDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateDocumentByAdmin)
);
router.post(
  '/documents',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(CreateDocumentRequestForAdmin, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createNewDocumentByAdmin)
);
router.post('/login', asyncRouteHandler(controller.adminLogin));
router.patch(
  '/exams/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(UpdateExamByAdminDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsExamDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateExamByAdmin)
);

export default router;
