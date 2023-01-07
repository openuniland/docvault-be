import { ErrorCodes, HttpException } from 'exceptions';
import UserExamModel from 'models/schema/UserExam';
import { logger } from 'utils/logger';

import { UserExamDto, UpdateUserExamDto } from './dto/UserExamDto';

//Get all user's user-exams
export const getUserExams = async () => {
  try {
    const userExam = await UserExamModel.find().populate('author').populate('exam');
    logger.info(`Get user exams succesfully`);

    return userExam;
  } catch (error) {
    logger.error(`Error while get user exam: ${error}`);

    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

//Get a user-exam by id
export const getUserExamById = async (id: string) => {
  try {
    const userExam = await UserExamModel.find({ _id: id }).populate('author').populate('exam');
    logger.info(`Get a user exam successfully`);

    return userExam;
  } catch (error) {
    logger.error(`Error while get a user exam by id: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const createUserExam = async (input: UserExamDto) => {
  try {
    const userExam = await UserExamModel.create(input);
    logger.info(`Create user exams succesfully`);

    return userExam;
  } catch (error) {
    logger.error(`Error while create user exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateUserExam = async (input: UpdateUserExamDto, id: string) => {
  try {
    const userExam = await UserExamModel.findOneAndUpdate(
      { _id: id },
      {
        $set: input,
      }
    );
    logger.info(`Update user exam successfully`);

    return userExam;
  } catch (error) {
    logger.error(`Error while update user exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const deleteUserExam = async (id: string) => {
  try {
    const userExam = await UserExamModel.findOneAndDelete({ _id: id });
    logger.info(`Delete user exam successfully`);

    return userExam;
  } catch (error) {
    logger.error(`Error while delete user exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
