import { ErrorCodes, HttpException } from 'exceptions';
import { UserAnswerModel } from 'models';
import { logger } from 'utils/logger';
import { UpdateUserAnswerDto, UserAnswerDto } from './dto/UserAnswerDto';

export const getUsersAnswers = async () => {
  try {
    const data = await UserAnswerModel.find().populate('answers').populate('user_exam');

    return data;
  } catch (error) {
    logger.error(`Error while get all UserAnswers: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const createUserAnswer = async (input: UserAnswerDto) => {
  try {
    const data = await UserAnswerModel.create(input);

    return data;
  } catch (error) {
    logger.error(`Error while create UserAnswer: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateUserAnswer = async (id: string, input: UpdateUserAnswerDto) => {
  try {
    const data = await UserAnswerModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: input,
      }
    );

    return data;
  } catch (error) {
    logger.error(`Error while update UserAnswer: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const deleteUserAnswer = async (id: string) => {
  try {
    const data = await UserAnswerModel.findOneAndDelete({ _id: id });

    return data;
  } catch (error) {
    logger.error(`Error while update UserAnswer: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
