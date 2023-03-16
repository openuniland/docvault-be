import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';

import { QuestionDto, UpdateQuestionDto, ParamsQuestionDto } from './dto/QuestionDto';
import URLParams from 'utils/rest/urlparams';

export const getQuestions = async (req: RequestWithUser, res: Response) => {
  const urlParams: URLParams = req.searchParams;
<<<<<<< HEAD
  const { result, meta } = await service.getQuestions(urlParams);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK', meta.total, meta.currentPage, meta.pageSize));
=======
  const result = await service.getQuestions(urlParams);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
>>>>>>> master
};

export const createQuestion = async (req: RequestWithUser, res: Response) => {
  const input: QuestionDto = req.body;
  const result = await service.createQuestion(input);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateQuestion = async (req: RequestWithUser, res: Response) => {
  const params: ParamsQuestionDto = req.params;
  const input: UpdateQuestionDto = req.body;

  const result = await service.updateQuestion(input, params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const deleteQuestion = async (req: RequestWithUser, res: Response) => {
  const params: ParamsQuestionDto = req.params;

  const result = await service.deleteQuestion(params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
