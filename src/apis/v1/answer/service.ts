import { ErrorCodes, HttpException } from 'exceptions';
import { AnswerModel } from 'models';
import { logger } from 'utils/logger';
import { AnswerDto, UpdateAnswerDto } from './dto/AnswerDto';

export const getAnswers = async () => {
  try {
    const data = await AnswerModel.find();

    return data;
  } catch (error) {
    logger.error(`Error while get answer: ${error}`);
  }
};

export const createAnswer = async (input: AnswerDto) => {
  try {
    const data = await AnswerModel.create(input);

    return data;
  } catch (error) {
    logger.error(`Error while create answer: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateAnswer = async (input: UpdateAnswerDto, id: string) => {
  try {
    const data = await AnswerModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: input,
      }
    );

    return data;
  } catch (error) {
    logger.error(`Error while update answer: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const deleteAnswer = async (id: string) => {
  try {
    const data = await AnswerModel.findOneAndDelete({ _id: id });

    return data;
  } catch (error) {
    logger.error(`Error while delete answer: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
