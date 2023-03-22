import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';

import { UserExamDto, ParamsUserExamDto, UserExamFilter, SubmitTheExamDto } from './dto/UserExamDto';
import { ObjectId } from 'mongoose';
import URLParams from 'utils/rest/urlparams';

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

export const getAllUserExamsByOwner = async (req: RequestWithUser, res: Response) => {
  const author = req?.user?._id;
  const filter: UserExamFilter = req.query;
  const urlParams: URLParams = req.searchParams;
  const { result, meta } = await service.getAllUserExamsByOwner(String(author), filter, urlParams);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK', meta.total, meta.currentPage, meta.pageSize));
};

export const getUserExamByOwner = async (req: RequestWithUser, res: Response) => {
  const author: string = req?.user?.email;
  const params: ParamsUserExamDto = req.params;

  const result = await service.getUserExamByOwner(author, params.id);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const submitTheExam = async (req: RequestWithUser, res: Response) => {
  const author: ObjectId = req?.user?._id;
  const input: SubmitTheExamDto = req.body;

  const result = await service.submitTheExam(author, input.user_exam_id);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
