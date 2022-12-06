import { Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import * as service from './service';
import fmt from 'utils/formatter';

export const createUser = async (req: RequestWithUser, res: Response) => {
  const result = await service.createUser(req.body);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
