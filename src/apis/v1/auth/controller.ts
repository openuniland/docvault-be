import { Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import * as service from './service';
import fmt from 'utils/formatter';
import { LoginDto } from './dto/LoginDto';

// POST: v1/auth/login
const login = async (req: RequestWithUser, res: Response) => {
  const input = req.headers['google-token'];
  const checker = Array.isArray(input);
  const token: LoginDto = checker ? { googleToken: input[0] } : { googleToken: input };

  const result = await service.login(token);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export { login };
