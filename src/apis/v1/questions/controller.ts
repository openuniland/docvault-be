import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';

import { QuestionDto, UpdateQuestionDto, ParamsQuestionDto } from './dto/QuestionDto';

export const getQuestions = async (req: RequestWithUser, res: Response) => {
  const result = await service.getQuestions();
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
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