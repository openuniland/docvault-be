import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';
import { AnswerDto, ParamsAnswerDto, UpdateAnswerDto } from './dto/AnswerDto';
import URLParams from 'utils/rest/urlparams';

export const getAnswers = async (req: RequestWithUser, res: Response) => {
  const urlParams: URLParams = req.searchParams;
  const { result, meta } = await service.getAnswers(urlParams);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK', meta.total, meta.currentPage, meta.pageSize));
};

export const createAnswer = async (req: RequestWithUser, res: Response) => {
  const input: AnswerDto = req.body;
  const result = await service.createAnswer(input);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateAnswer = async (req: RequestWithUser, res: Response) => {
  const params: ParamsAnswerDto = req.params;
  const input: UpdateAnswerDto = req.body;
  const result = await service.updateAnswer(input, params.id);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const deleteAnswer = async (req: RequestWithUser, res: Response) => {
  const params: ParamsAnswerDto = req.params;
  const result = await service.deleteAnswer(params.id);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
