import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';

import { UserExamDto, ParamsUserExamDto, UserExamFilter } from './dto/UserExamDto';
import { ObjectId } from 'mongoose';

export const createUserExam = async (req: RequestWithUser, res: Response) => {
  const input: UserExamDto = req.body;
  const author: ObjectId = req?.user?._id;

  const result = await service.createUserExam(input, author);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const deleteUserExam = async (req: RequestWithUser, res: Response) => {
  const params: ParamsUserExamDto = req.params;

  const result = await service.deleteUserExam(params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getAllUserExamsOfUser = async (req: RequestWithUser, res: Response) => {
  const author: ObjectId = req?.user?._id;
  const filter: UserExamFilter = req.query;
  const result = await service.getAllUserExamsOfUser(author, filter);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getUserExamOfUser = async (req: RequestWithUser, res: Response) => {
  const author: string = req?.user?.email;
  const params: ParamsUserExamDto = req.params;

  const result = await service.getUserExamOfUser(author, params.id);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
