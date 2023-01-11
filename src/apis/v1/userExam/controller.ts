import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';

import { UserExamDto, ParamsUserExamDto, UpdateUserExamDto } from './dto/UserExamDto';
import { ObjectId } from 'mongoose';

export const getUserExams = async (req: RequestWithUser, res: Response) => {
  const result = await service.getUserExams();
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const createUserExam = async (req: RequestWithUser, res: Response) => {
  const input: UserExamDto = req.body;
  const author: ObjectId = req?.user?._id;

  const result = await service.createUserExam(input, author);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateUserExam = async (req: RequestWithUser, res: Response) => {
  const params: ParamsUserExamDto = req.params;
  const input: UpdateUserExamDto = req.body;

  const result = await service.updateUserExam(input, params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const deleteUserExam = async (req: RequestWithUser, res: Response) => {
  const params: ParamsUserExamDto = req.params;

  const result = await service.deleteUserExam(params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getUserExamsByUser = async (req: RequestWithUser, res: Response) => {
  const params: ParamsUserExamDto = req.params;
  const result = await service.getUserExamsByUser(params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
