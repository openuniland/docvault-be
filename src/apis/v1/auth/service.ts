import { UserDto } from './../user/dto/UserDto';
import configs from 'configs';
import { ErrorCodes, HttpException } from 'exceptions';

import { OAuth2Client } from 'google-auth-library';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from 'helpers/jwt';
import { logger } from 'utils/logger';
import JWTPayload from 'utils/types';
import { LoginDto } from './dto/LoginDto';
import { createUser } from '../user/service';
import { HOU_ENDPOINT } from 'utils/constants';
import { RefreshTokenDto } from './dto/RefreshTokenDto';

const client = new OAuth2Client(configs.google.clientID);

export const organizationValidation = (email: string) => {
  return email.endsWith(HOU_ENDPOINT);
};

export const verify = async (tokenGoogle: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenGoogle,
      audience: configs.google.clientID,
    });

    const payload = ticket.getPayload();
    const userId = payload.sub;
    const name = payload.name;
    const email = payload.email;

    if (!organizationValidation(email)) {
      throw new HttpException(403, 'Does not belong to our organization', 'NOT_BELONG_TO_ORGANIZATION');
    }

    const user = {
      name,
      email,
      userId,
    };
    return user;
  } catch (error) {
    logger.error(`Error while verify: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const login = async function (input: LoginDto) {
  try {
    const { googleToken } = input;

    const result = await verify(googleToken);

    const newUser = {
      fullname: result.name,
      email: result.email,
    } as UserDto;

    const user = await createUser(newUser);

    const payload: JWTPayload = {
      name: user.fullname,
      email: user.email,
      role: user.roles,
      is_blocked: user.is_blocked,
      _id: user._id,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    logger.error(`Error while login: ${error}`);
    throw new HttpException(400, 'error', ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const refreshToken = async function (input: RefreshTokenDto) {
  try {
    const res = await verifyRefreshToken(input?.refreshToken);

    const payload = {
      name: res.name,
      email: res.email,
      role: res.role,
      is_blocked: res.is_blocked,
      _id: res._id,
    };

    const accessToken = signAccessToken(payload);
    const newRefreshToken = signRefreshToken(payload);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    logger.error(`Error while login: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};
