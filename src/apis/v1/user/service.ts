import { ErrorCodes, HttpException } from 'exceptions';
import UserModel from 'models/schema/User';
import { logger } from 'utils/logger';
import { UserDto } from './dto/UserDto';

export const createUser = async function (input: UserDto) {
  try {
    const user = await UserModel.create(input);
    logger.info(`Created user ${input.fullname} successfully`);
    return user;
  } catch (error) {
    logger.error(`Error while create new user: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
