import { Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';

const checkHealth = (request: RequestWithUser, response: Response) => {
  const data: any = { message: 'Service Up' };
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { checkHealth };
