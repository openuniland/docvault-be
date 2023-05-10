import { Response } from 'express';

import RequestWithUser from 'utils/rest/request';
import * as service from './service';
import fmt from 'utils/formatter';

import { UserDto, UpdateUserDto, ParamsUserDto, QueryUserDto } from './dto/UserDto';
import URLParams from 'utils/rest/urlparams';

export const createUser = async (request: RequestWithUser, response: Response) => {
  const input: UserDto = request.body;

  const result = await service.createUser(input);
  response.send(fmt.formatResponse(result, Date.now() - request.startTime, 'OK'));
};

export const getUsers = async (req: RequestWithUser, response: Response) => {
  const urlParams: URLParams = req.searchParams;
  const { result, meta } = await service.getUsers(urlParams);
  response.send(
    fmt.formatResponse(result, Date.now() - req.startTime, 'OK', meta.total, meta.currentPage, meta.pageSize)
  );
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

export const getUserByEmail = async (req: RequestWithUser, res: Response) => {
  const query: QueryUserDto = req.query;

  const result = await service.getUserByEmail(query.email);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getUserById = async (req: RequestWithUser, res: Response) => {
  const author = req.user._id;

  const result = await service.getUserById(String(author));
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateUserByOwner = async (req: RequestWithUser, res: Response) => {
  const author = req.user._id;
  const input: UpdateUserDto = req.body;

  const result = await service.updateUser(input, String(author));
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
