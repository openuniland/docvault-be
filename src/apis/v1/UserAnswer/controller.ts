import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';
import { ParamsUserAnswerDto, UpdateUserAnswerDto, UserAnswerDto } from './dto/UserAnswerDto';

export const getUsersAnswers = async (req: RequestWithUser, res: Response) => {
  const result = await service.getUsersAnswers();

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const createUsersAnswer = async (req: RequestWithUser, res: Response) => {
  const input: UserAnswerDto = req.body;
  const result = await service.createUserAnswer(input);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateUserAnswer = async (req: RequestWithUser, res: Response) => {
  const params: ParamsUserAnswerDto = req.params;
  const input: UpdateUserAnswerDto = req.body;
  const result = await service.updateUserAnswer(params.id, input);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const deleteUserAnswer = async (req: RequestWithUser, res: Response) => {
  const params: ParamsUserAnswerDto = req.params;
  const result = await service.deleteUserAnswer(params.id);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
