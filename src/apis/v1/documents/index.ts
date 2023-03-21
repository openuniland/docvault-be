import { Router } from 'express';

import { asyncRouteHandler, authMiddleware } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import * as controller from './controller';

import { DocumentDto, UpdateDocumentByOwnerDto, ParamsDocumentDto } from './dto/DocumentsDto';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getDocuments));

router.post(
  '/',
  authMiddleware,
  validationMiddleware(DocumentDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createDocument)
);

router.put(
  '/:id',
  authMiddleware,
  validationMiddleware(UpdateDocumentByOwnerDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsDocumentDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateDocumentByOwner)
);

router.delete(
  '/:id',
  authMiddleware,
  validationMiddleware(ParamsDocumentDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteDocument)
);

router.get(
  '/:id',
  authMiddleware,
  validationMiddleware(ParamsDocumentDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.getDocumentById)
);

router.get(
  '/subject/:id',
  authMiddleware,
  validationMiddleware(ParamsDocumentDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.getDocumentsBySubjectId)
);
export default router;
