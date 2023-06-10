import { Router } from 'express';

import * as controller from './controller';
import { validationMiddleware } from 'middlewares/validation';
import { APP_CONSTANTS } from 'utils/constants';
import { asyncRouteHandler, adminMiddleware, authMiddleware } from 'middlewares';
// import { approverMiddleware } from 'middlewares/auth';
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

router.get('/', authMiddleware, adminMiddleware, asyncRouteHandler(controller.getPopups));

router.get('/daily', authMiddleware, adminMiddleware, asyncRouteHandler(controller.getPopupsByDateRange));

export default router;
