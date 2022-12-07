import { Response } from 'express';

import RequestWithUser from 'utils/rest/request';
import * as service from './service';
import fmt from 'utils/formatter';
import { UserDto } from './dto/UserDto';

export const createUser = async (request: RequestWithUser, response: Response) => {
  const input: UserDto = request.body;

  const result = await service.createUser(input);
  response.send(fmt.formatResponse(result, Date.now() - request.startTime, 'OK'));
};

export const getUsers = async (request: RequestWithUser, response: Response) => {
  const result = await service.getUsers();
  response.send(fmt.formatResponse(result, Date.now() - request.startTime, 'OK'));
};
