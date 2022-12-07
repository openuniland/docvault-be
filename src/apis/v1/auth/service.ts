import { UserDto } from '../users/dto/UserDto';
import configs from 'configs';
import { ErrorCodes, HttpException } from 'exceptions';

import { OAuth2Client } from 'google-auth-library';
import { signAccessToken, signRefreshToken } from 'helpers/jwt';
import { logger } from 'utils/logger';
import JWTPayload from 'utils/types';
import { LoginDto } from './dto/LoginDto';
import { createUser } from '../users/service';
import { HOU_ENDPOINT } from 'utils/constants';

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
      throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
    }

    const user = {
      name,
      email,
      userId,
    };
    return user;
  } catch (error) {
    logger.error(`Error while verify: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
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
    };

    const accessToken = await signRefreshToken(payload);
    const refreshToken = await signAccessToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    logger.error(`Error while login: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
