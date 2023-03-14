import JWT from 'jsonwebtoken';

import configs from 'configs';
import JWTPayload from 'utils/types';
import { logger } from 'utils/logger';
import { HttpException } from 'exceptions';

export const signRefreshToken = (payload: JWTPayload) => {
  try {
    const secret = configs.jwt.refreshTokenSecret;

    const options = {
      expiresIn: configs.jwt.refreshTokenExpiresIn,
    };

    return JWT.sign(payload, secret, options);
  } catch (error) {
    logger.error(`Error while signing refresh token: ${error}`);
  }
};

export const signAccessToken = (payload: JWTPayload) => {
  try {
    const secret = configs.jwt.accessTokenSecret;

    const options = {
      expiresIn: configs.jwt.accessTokenExpiresIn,
    };

    return JWT.sign(payload, secret, options);
  } catch (error) {
    logger.error(`Error while signing access token: ${error}`);
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const secret = configs.jwt.refreshTokenSecret;

    return JWT.verify(token, secret) as JWTPayload;
  } catch (error) {
    logger.error(`Error while verifying refresh token: ${error}`);
    throw new HttpException(403, 'Refresht token is invalid', 'INVALID_TOKEN');
  }
};

export const verifyAccessToken = (token: string): JWTPayload => {
  try {
    const secret = configs.jwt.accessTokenSecret;

    return JWT.verify(token, secret) as JWTPayload;
  } catch (error) {
    logger.error(`Error while verifying access token: ${error}`);
    throw new HttpException(403, 'Access token is invalid', 'INVALID_TOKEN');
  }
};
