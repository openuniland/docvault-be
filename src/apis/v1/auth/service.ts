import configs from 'configs';
import { ErrorCodes, HttpException } from 'exceptions';
import axios from 'axios';

import { OAuth2Client } from 'google-auth-library';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from 'helpers/jwt';
import { logger } from 'utils/logger';
import JWTPayload from 'utils/types';
import { LoginDto } from './dto/LoginDto';
import { createUser } from '../user/service';
import { HOU_ENDPOINT } from 'utils/constants';
<<<<<<< HEAD
import { UserDto } from '../user/dto/UserDto';
<<<<<<< HEAD
<<<<<<< HEAD
import { RefreshTokenDto } from './dto/RefreshTokenDto';
import { UserinfoByGoogleApiResponse } from 'utils/types/auth';
=======
>>>>>>> 964a63c (Feat/#8 (#25))
=======
=======
import { RefreshTokenDto } from './dto/RefreshTokenDto';
>>>>>>> 0f2d5cd (feat: [#5] (#67))
>>>>>>> fab65e0 (feat: [#5] (#67))

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
<<<<<<< HEAD
    logger.error(`Error while verify credentials: ${error}`);
=======
    logger.error(`Error while verify: ${error}`);
>>>>>>> fab65e0 (feat: [#5] (#67))
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const verifyGoogleAccessToken = async (accessToken: string) => {
  const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);

  const userInfo: UserinfoByGoogleApiResponse = res.data;

  if (!organizationValidation(userInfo.email)) {
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

<<<<<<< HEAD
<<<<<<< HEAD
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

=======
    const accessToken = await signRefreshToken(payload);
    const refreshToken = await signAccessToken(payload);
<<<<<<< HEAD
>>>>>>> 964a63c (Feat/#8 (#25))
=======
=======
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
>>>>>>> fab65e0 (feat: [#5] (#67))

>>>>>>> dcf8db9 (feat/#4 (#30))
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
<<<<<<< HEAD
    throw new HttpException(403, error?.message, error?.errorCode);
=======
    throw new HttpException(400, 'error', ErrorCodes.BAD_REQUEST.CODE);
>>>>>>> fab65e0 (feat: [#5] (#67))
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
<<<<<<< HEAD
      _id: res._id,
=======
>>>>>>> fab65e0 (feat: [#5] (#67))
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
