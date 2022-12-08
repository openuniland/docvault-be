import { Router } from 'express';

import { getSubjects, createSubject, updateSubject, deleteSubject } from './controller';
import { asyncRouteHandler } from 'middlewares';

const router = Router();

router.put('/:id', asyncRouteHandler(updateSubject));
router.get('/', asyncRouteHandler(getSubjects));
router.post('/', asyncRouteHandler(createSubject));
router.delete('/:id', asyncRouteHandler(deleteSubject));

export default router;
