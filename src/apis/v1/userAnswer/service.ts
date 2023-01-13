import { ErrorCodes, HttpException } from 'exceptions';
import { UserAnswerModel } from 'models';
import { logger } from 'utils/logger';
import { UpdateUserAnswerDto, UserAnswerDto } from './dto/UserAnswerDto';

export const createUserAnswer = async (input: UserAnswerDto) => {
  try {
    const { number_of_answers } = input;
    const answers_id = Array(number_of_answers).fill('');

    const result = await UserAnswerModel.create({
      number_of_answers,
      answers_id,
    });

    return result;
  } catch (error) {
    logger.error(`Error while create UserAnswer: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateUserAnswer = async (userAnswerId: string, input: UpdateUserAnswerDto) => {
  try {
    const data = await UserAnswerModel.findByIdAndUpdate(
      {
        _id: userAnswerId,
      },
      {
        $push: {
          answers_id: {
            $each: [input.answer_id],
            $position: input.position,
          },
        },
      }
    );

    return data;
  } catch (error) {
    logger.error(`Error while update UserAnswer: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};
