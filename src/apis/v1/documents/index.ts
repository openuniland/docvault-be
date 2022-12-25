import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import * as controller from './controller';

import { DocumentDto, UpdateDocumentDto, ParamsDocumentDto } from './dto/DocumentsDto';

const router = Router();

router.get('/', asyncRouteHandler(controller.getDocument));

router.post('/', validationMiddleware(DocumentDto, APP_CONSTANTS.body), asyncRouteHandler(controller.createDocument));

router.put(
  '/:id',
  validationMiddleware(UpdateDocumentDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsDocumentDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateDocument)
);

router.delete(
  '/:id',
  validationMiddleware(UpdateDocumentDto, APP_CONSTANTS.body),
  validationMiddleware(ParamsDocumentDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteDocument)
);
export default router;
