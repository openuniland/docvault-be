import configs from 'configs';
import { ErrorCodes, HttpException } from 'exceptions';

import { OAuth2Client } from 'google-auth-library';
import { signAccessToken, signRefreshToken } from 'helpers/jwt';
import UserModel from 'models/schema/User';
import User from 'models/types/User';
import { logger } from 'utils/logger';
import JWTPayload from 'utils/types';
import { LoginDto } from './dto/LoginDto';

const client = new OAuth2Client(configs.google.clientID);

const verify = async (tokenGoogle: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenGoogle,
      audience: configs.google.clientID,
    });

    const payload = ticket.getPayload();
    const userId = payload.sub;
    const name = payload.name;
    const email = payload.email;
    const user = {
      name,
      email,
      userId,
    };
    return user;
  } catch (error) {
    logger.error(`Error while login: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

const findRole = async (email: string) => {
  const user: User = await UserModel.findOne({ email });

  return user?.roles;
};

const login = async function (input: LoginDto) {
  try {
    const { googleToken } = input;

    const result = await verify(googleToken);
    const role = await findRole(result.email);

    const payload: JWTPayload = {
      userId: result.userId,
      name: result.name,
      email: result.email,
      role,
    };

    const accessToken = await signRefreshToken(payload);
    const refreshToken = await signAccessToken(payload);

    //create new user if not exist

    return {
      accessToken,
      refreshToken,
      payload,
    };
  } catch (error) {
    logger.error(`Error while login: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export { login, verify };
