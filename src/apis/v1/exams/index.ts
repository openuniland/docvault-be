import { Router } from 'express';

import { getExams, getExam, getExamsOfSubject, createExam, updateExam, deleteExam } from './controller';
import { asyncRouteHandler } from 'middlewares';

const router = Router();

router.get('/', asyncRouteHandler(getExams));
router.get('/:id', asyncRouteHandler(getExam));
router.get('/subject', asyncRouteHandler(getExamsOfSubject));
router.post('/', asyncRouteHandler(createExam));
router.put('/:id', asyncRouteHandler(updateExam));
router.delete('/:id', asyncRouteHandler(deleteExam));

export default router;
