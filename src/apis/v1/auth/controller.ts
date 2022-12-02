import { Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import * as service from './service';
import fmt from 'utils/formatter';
import { LoginDto } from './dto/LoginDto';
import { logger } from 'utils/logger';
import { ErrorCodes, HttpException } from 'exceptions';

import UserModel from 'models/schema/User';

// POST: v1/auth/login
const login = async (req: RequestWithUser, res: Response) => {
  try {
    const input = req.headers['google-token'];
    const checker = Array.isArray(input);
    const token: LoginDto = checker ? { googleToken: input[0] } : { googleToken: input };

    const result = await service.login(token);
    res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
  } catch (err) {
    logger.error(`Error while login: ${err}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

const saveUser = async (req: RequestWithUser, res: Response) => {
  try {
    const input = req.headers['google-token'];
    const checker = Array.isArray(input);
    const token: LoginDto = checker ? { googleToken: input[0] } : { googleToken: input };

    const result = await service.login(token);
    const userTest = new UserModel({
      fullname: result.payload.name,
      email: result.payload.email,
      is_blocked: false,
      role: 'ADMIN',
    });
    const user = await userTest.save();
    console.log('user', user);
    res.send(fmt.formatResponse(user, Date.now() - req.startTime, 'Save user successfully'));
  } catch (err) {
    logger.error(`Error while login: ${err}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
export { login, saveUser };
