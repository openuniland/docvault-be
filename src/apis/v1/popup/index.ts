import { Router } from 'express';

import * as controller from './controller';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import { asyncRouteHandler, adminMiddleware, authMiddleware } from 'middlewares';
import { DocumentDto, ParamsPopupDto } from './dto/CreatePopupDto';

const router = Router();

router.post(
  '/',
  authMiddleware,
  validationMiddleware(DocumentDto, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createPopup)
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(ParamsPopupDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deletePopup)
);

router.patch(
  '/revoke/:id',
  authMiddleware,
  validationMiddleware(ParamsPopupDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.revokedPopup)
);

router.get('/', authMiddleware, asyncRouteHandler(controller.getPopups));

router.get('/daily', authMiddleware, adminMiddleware, asyncRouteHandler(controller.getPopupsByDateRange));

router.patch(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(ParamsPopupDto, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updatePopup)
);

export default router;
