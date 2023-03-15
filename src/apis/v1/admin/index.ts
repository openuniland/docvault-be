import { Router } from 'express';

import { asyncRouteHandler, authMiddleware, adminMiddleware } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import {
  CreateDocumentRequestForAdmin,
  DocumentApproveRequest,
  ParamsDocumentDto,
} from '../documents/dto/DocumentsDto';
import * as controller from './controller';

const router = Router();

router.get('/user-exams', authMiddleware, adminMiddleware, asyncRouteHandler(controller.getAllUserExams));
router.get('/documents', authMiddleware, adminMiddleware, asyncRouteHandler(controller.getDocumentsByAdmin));
router.patch(
  '/documents/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(DocumentApproveRequest, APP_CONSTANTS.body),
  validationMiddleware(ParamsDocumentDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.approveTheDocumentByAdmin)
);
router.post(
  '/documents',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(CreateDocumentRequestForAdmin, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createNewDocumentByAdmin)
);
router.post('/login', asyncRouteHandler(controller.adminLogin));

export default router;
