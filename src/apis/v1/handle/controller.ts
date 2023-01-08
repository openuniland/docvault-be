import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';

import { ParamsUserExamDto } from '../UserExam/dto/UserExamDto';
export const getUserExamById = async (req: RequestWithUser, res: Response) => {
  const params: ParamsUserExamDto = req.params;
  const result = await service.getUserExamById(params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
