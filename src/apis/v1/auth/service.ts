import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';

import configs from 'configs';
import { ErrorCodes, HttpException } from 'exceptions';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from 'helpers/jwt';
import { logger } from 'utils/logger';
import JWTPayload from 'utils/types';
import { LoginDto } from './dto/LoginDto';
import { createUser, getUserByEmail, getUserById } from '../user/service';
import { HOU_ENDPOINT, ROLES } from 'utils/constants';
import { UserDto } from '../user/dto/UserDto';
import { RefreshTokenDto } from './dto/RefreshTokenDto';
import { UserinfoByGoogleApiResponse } from 'utils/types/auth';

const client = new OAuth2Client(configs.google.clientID);

export const organizationValidation = (email: string) => {
  return email.endsWith(HOU_ENDPOINT);
};

export const verifyCredentials = async (tokenGoogle: string) => {
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
    logger.error(`Error while verify credentials: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const verifyGoogleAccessToken = async (accessToken: string) => {
  const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);

  const userInfo: UserinfoByGoogleApiResponse = res.data;

  const userExisted = await getUserByEmail(userInfo.email);

  if (!organizationValidation(userInfo.email) && !userExisted) {
    throw new HttpException(403, 'Does not belong to our organization', 'NOT_BELONG_TO_ORGANIZATION');
  }

  return userInfo;
};

export const login = async function (input: LoginDto) {
  try {
    const { googleToken } = input;

    const result = await verifyGoogleAccessToken(googleToken);

    const newUser = {
      fullname: result.name,
      email: result.email,
      avatar: result.picture,
    } as UserDto;

    const user = await createUser(newUser);

    const payload: JWTPayload = {
      name: user.fullname,
      email: user.email,
      avatar: user.avatar,
      role: user.roles,
      is_blocked: user.is_blocked,
      _id: user._id,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      userInfo: {
        name: user.fullname,
        email: user.email,
        avatar: user.avatar,
      },
    };
  } catch (error) {
    logger.error(`Error while login: ${error}`);
    throw new HttpException(403, error?.message, error?.errorCode);
  }
};

export const adminLogin = async function (input: LoginDto) {
  try {
    const { googleToken } = input;

    const result = await verifyGoogleAccessToken(googleToken);

    const newUser = {
      fullname: result.name,
      email: result.email,
      avatar: result.picture,
    } as UserDto;

    const user = await createUser(newUser);

    if (user.roles !== ROLES.ADMIN) {
      throw new HttpException(403, 'You are not admin', 'NOT_ADMIN');
    }

    const payload: JWTPayload = {
      name: user.fullname,
      email: user.email,
      avatar: user.avatar,
      role: user.roles,
      is_blocked: user.is_blocked,
      _id: user._id,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      userInfo: {
        name: user.fullname,
        email: user.email,
        avatar: user.avatar,
      },
    };
  } catch (error) {
    logger.error(`Error while login with admin: ${error}`);
    throw new HttpException(403, error?.message, error?.errorCode);
  }
};

export const refreshToken = async function (input: RefreshTokenDto) {
  try {
    const res = verifyRefreshToken(input?.refreshToken);
    const user = await getUserById(res._id);

    console.log('user', user);
    console.log('res', res);

    const payload = {
      name: user.fullname,
      email: user.email,
      role: user.roles,
      is_blocked: user.is_blocked,
      _id: res._id,
      avatar: user.avatar,
    };

    const accessToken = signAccessToken(payload);
    const newRefreshToken = signRefreshToken(payload);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      userInfo: {
        name: user.fullname,
        email: user.email,
        avatar: user.avatar,
      },
    };
  } catch (error) {
    logger.error(`Error while login: ${error}`);
    throw new HttpException(403, error?.message || error, 'REFRESH_TOKEN_INVALID');
  }
};
