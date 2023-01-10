import { Router } from 'express';

import { asyncRouteHandler, authMiddleware } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import * as controller from './controller';

import { DocumentDto, UpdateDocumentDto, ParamsDocumentDto } from './dto/DocumentsDto';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getDocument));
router.get(
  '/UserDocument/:id',
  authMiddleware,
  validationMiddleware(ParamsDocumentDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.getDocumentsOfUser)
);

router.post(
  '/',
  authMiddleware,
  validationMiddleware(DocumentDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createDocument)
);

router.put(
  '/:id',
  authMiddleware,
  validationMiddleware(UpdateDocumentDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsDocumentDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateDocument)
);

router.delete(
  '/:id',
  authMiddleware,
  validationMiddleware(UpdateDocumentDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsDocumentDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteDocument)
);
export default router;
