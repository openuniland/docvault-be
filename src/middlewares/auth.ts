import { Response, NextFunction } from 'express';

import { ErrorCodes, HttpException } from 'exceptions';
import { verifyAccessToken } from 'helpers/jwt';
import RequestWithUser from 'utils/rest/request';
import JWTPayload from 'utils/types';
import { HOU_ENDPOINT, ROLES } from 'utils/constants';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.headers?.authorization;
  try {
    if (!token) {
      return res.status(404).json({
        message: 'Token is invalid',
      });
    }
    const data: JWTPayload = verifyAccessToken(token);

    req.user = data;
    next();
  } catch (err) {
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

const adminMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user || user.role != ROLES.ADMIN) {
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  } else {
    next();
  }
};

const houMailMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const user = req.user;
  const houMail: string = HOU_ENDPOINT;
  if (!user || !user.email.include(houMail)) {
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  } else {
    next();
  }
};
export { authMiddleware, adminMiddleware, houMailMiddleware };
