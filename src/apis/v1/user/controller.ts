import { Response } from 'express';

import RequestWithUser from 'utils/rest/request';
import * as service from './service';
import fmt from 'utils/formatter';
import { UserDto, UpdateUserDto, ParamsUserDto } from './dto/UserDto';

export const createUser = async (request: RequestWithUser, response: Response) => {
  const input: UserDto = request.body;

  const result = await service.createUser(input);
  response.send(fmt.formatResponse(result, Date.now() - request.startTime, 'OK'));
};

export const getUsers = async (request: RequestWithUser, response: Response) => {
  const result = await service.getUsers();
  response.send(fmt.formatResponse(result, Date.now() - request.startTime, 'OK'));
};

export const updateUser = async (request: RequestWithUser, response: Response) => {
  const params: ParamsUserDto = request.params;
  const input: UpdateUserDto = request.body;

  const result = await service.updateUser(input, params.id);
  response.send(fmt.formatResponse(result, Date.now() - request.startTime, 'OK'));
};
export const deleteUser = async (request: RequestWithUser, response: Response) => {
  const params: ParamsUserDto = request.params;

  const result = await service.deleteUser(params.id);
  response.send(fmt.formatResponse(result, Date.now() - request.startTime, 'OK'));
};