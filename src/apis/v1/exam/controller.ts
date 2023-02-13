import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';

import { ParamsExamDto, QueryExamDto, ExamDto, UpdateExamDto } from './dto/ExamDto';
import { ObjectId } from 'mongoose';

export const getExams = async (req: RequestWithUser, res: Response) => {
  const result = await service.getExams();

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getExamById = async (req: RequestWithUser, res: Response) => {
  const input: ParamsExamDto = req.params;
  const result = await service.getExamById(input.id);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getExamBySubject = async (req: RequestWithUser, res: Response) => {
  const input: QueryExamDto = req.query;
  const result = await service.getExamBySubject(input.subject_name);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const createExam = async (req: RequestWithUser, res: Response) => {
  const input: ExamDto = req.body;
  const author: ObjectId = req?.user?._id;
  const result = await service.createExam(input, author);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateExam = async (req: RequestWithUser, res: Response) => {
  const params: ParamsExamDto = req.params;
  const input: UpdateExamDto = req.body;
  const result = await service.updateExam(params.id, input);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const deleteExam = async (req: RequestWithUser, res: Response) => {
  const params: ParamsExamDto = req.params;
  const result = await service.deleteExam(params.id);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
