import { ObjectId } from 'mongoose';
import { ErrorCodes, HttpException } from 'exceptions';
import UserModel from 'models/schema/User';
import { logger } from 'utils/logger';

import { UserDto, UpdateUserDto } from './dto/UserDto';
import URLParams from 'utils/rest/urlparams';
import { DEFAULT_PAGING } from 'utils/constants';

export const createUser = async function (input: UserDto) {
  try {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const user = await UserModel.findOneAndUpdate(
      {
        email: input.email,
      },
      {
        fullname: input.fullname,
        email: input.email,
        avatar: input.avatar,
        roles: input.role,
        is_blocked: input.is_blocked,
      },
      options
    );

    logger.info(`Created user ${user?.fullname} successfully`);

    return user;
  } catch (error) {
    logger.error(`Error while create new user: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getUsers = async function (urlParams: URLParams) {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;

    const order = urlParams.order || 'DESC';

    const count = UserModel.countDocuments();
    const users = UserModel.find()
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort({ created_at: order === 'DESC' ? -1 : 1 });

    const resolveAll = await Promise.all([count, users]);

    return {
      result: resolveAll[1],
      meta: {
        total: resolveAll[0],
        pageSize,
        currentPage,
      },
    };
  } catch (error) {
    logger.error(`Error while get all user: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getUserById = async function (id: ObjectId) {
  try {
    const user = await UserModel.findOne({ _id: id });

    return user;
  } catch (error) {
    logger.error(`Error while get user: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getUserByEmail = async function (email: string) {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    logger.error(`Error while get user by email: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateUser = async function (input: UpdateUserDto, id: string) {
  try {
    const users = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        fullname: input.fullname,
        roles: input.role,
        is_blocked: input.is_blocked,
      }
    );
    logger.info(`Update for user have id: ${id} successfully`);
    return users;
  } catch (error) {
    logger.error(`Error while update user: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const deleteUser = async function (id: string) {
  try {
    const users = await UserModel.findOneAndDelete({ _id: id });
    logger.info(`Delete user have id: ${id} successfully`);

    return users;
  } catch (error) {
    logger.error(`Error while delete user: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
