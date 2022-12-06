import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';
import {
  ExamDto,
  GetExamsOfSubjectDto,
  ParamDeleteExamDto,
  ParamGetExamDto,
  ParamUpdateExamDto,
  UpdateExamDto,
} from './dto/Exams';

export const getExams = async (req: RequestWithUser, res: Response) => {
  const result = await service.getExams();
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getExam = async (req: RequestWithUser, res: Response) => {
  const input: ParamGetExamDto = req.params;

  const result = await service.getExam(input);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getExamsOfSubject = async (req: RequestWithUser, res: Response) => {
  const input: GetExamsOfSubjectDto = req.body;

  const result = await service.getExamOfSubject(input);
  if (result) res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
  else res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'Subject does not exist'));
};

export const createExam = async (req: RequestWithUser, res: Response) => {
  const input: ExamDto = req.body;

  const result = await service.createExam(input);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateExam = async (req: RequestWithUser, res: Response) => {
  const id: ParamUpdateExamDto = req.params;
  const input: UpdateExamDto = req.body;

  const result = await service.updateExam(input, id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const deleteExam = async (req: RequestWithUser, res: Response) => {
  const input: ParamDeleteExamDto = req.params;

  const result = await service.deleteExam(input);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
