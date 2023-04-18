import { Response, NextFunction } from 'express';

import { verifyAccessToken } from 'helpers/jwt';
import RequestWithUser from 'utils/rest/request';
import JWTPayload from 'utils/types';
import { HOU_ENDPOINT, ROLES } from 'utils/constants';
import { HttpException } from 'exceptions';
import { logger } from 'utils/logger';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization;

  const bearerToken = authHeader?.split(' ');
  if (!authHeader) {
    return next(new HttpException(401, 'Unauthorized', 'UNAUTHORIZED'));
  }

  if (!bearerToken || bearerToken[0] !== 'Bearer') {
    return next(new HttpException(401, 'Not a Bearer token', 'BEARER_TOKEN'));
  }

  const token = bearerToken[1];

  try {
    if (!token) {
      return next(new HttpException(403, 'Token is invalid', 'INVALID_TOKEN'));
    }
    const data: JWTPayload = verifyAccessToken(token);

    req.user = data;
    return next();
  } catch (err) {
    logger.error(`Error in authMiddleware: ${err}`);
    next(new HttpException(err?.status || 401, err?.message || err, err?.errorCode || 'Unauthorized'));
  }
};

const authorizationMiddleware = (allowedRoles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req?.user;
    const condition = !user || !allowedRoles.includes(user.role);

    if (condition) {
      return next(new HttpException(403, 'Unauthorized', 'NOT_AUTHORIZED'));
    } else {
      next();
    }
  };
};

const adminMiddleware = authorizationMiddleware([ROLES.ADMIN.name]);
const approverMiddleware = authorizationMiddleware([ROLES.APPROVER.name, ROLES.ADMIN.name]);

const houMailMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const user = req.user;
  const houMail: string = HOU_ENDPOINT;
  if (!user || !user.email.includes(houMail)) {
    res.status(401).json({
      message: 'Not allowed',
    });
  } else {
    next();
  }
};
export { authMiddleware, adminMiddleware, houMailMiddleware, authorizationMiddleware, approverMiddleware };
