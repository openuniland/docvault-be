import { ErrorCodes, HttpException } from 'exceptions';
import UserModel from 'models/schema/User';
import { logger } from 'utils/logger';

import { UserDto, UpdateUserDto } from './dto/UserDto';

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
        roles: input.role,
        is_blocked: input.is_blocked,
      },
      options
    );

    logger.info(`Created user ${user?.fullname} successfully`);

    return user;
  } catch (error) {
    logger.error(`Error while create new user: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getUsers = async function () {
  try {
    const users = await UserModel.find();

    return users;
  } catch (error) {
    logger.error(`Error while get all user: ${error}`);
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

