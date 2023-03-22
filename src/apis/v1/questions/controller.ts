import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';

import { QuestionDto, UpdateQuestionDto, ParamsQuestionDto } from './dto/QuestionDto';
import URLParams from 'utils/rest/urlparams';
import { ObjectId } from 'mongoose';

export const getQuestions = async (req: RequestWithUser, res: Response) => {
  const urlParams: URLParams = req.searchParams;
  const { result, meta } = await service.getQuestions(urlParams);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK', meta.total, meta.currentPage, meta.pageSize));
};

export const createQuestion = async (req: RequestWithUser, res: Response) => {
  const input: QuestionDto = req.body;
  const author: ObjectId = req?.user?._id;

  const result = await service.createQuestion(input, author);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateQuestionByOwner = async (req: RequestWithUser, res: Response) => {
  const params: ParamsQuestionDto = req.params;
  const input: UpdateQuestionDto = req.body;
  const author: ObjectId = req?.user?._id;

  const result = await service.updateQuestionByOwner(input, params.id, author);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const deleteQuestion = async (req: RequestWithUser, res: Response) => {
  const params: ParamsQuestionDto = req.params;

  const result = await service.deleteQuestion(params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
