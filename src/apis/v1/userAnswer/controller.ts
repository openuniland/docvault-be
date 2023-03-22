import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';
import { ParamsUserAnswerDto, UpdateUserAnswerDto } from './dto/UserAnswerDto';

export const updateUserAnswer = async (req: RequestWithUser, res: Response) => {
  const params: ParamsUserAnswerDto = req.params;
  const input: UpdateUserAnswerDto = req.body;
  const author: string = req?.user?.email;

  const result = await service.updateUserAnswer(params.id, input, author);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
