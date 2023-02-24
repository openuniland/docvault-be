import { ErrorCodes, HttpException } from 'exceptions';
import { UserAnswerModel } from 'models';
import UserExamModel from 'models/schema/UserExam';
import { logger } from 'utils/logger';
import { calculateScore } from '../userExam/service';
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
    const { user_exam_id } = input;

    const userExam = await UserExamModel.findOne({ _id: user_exam_id }).populate({
      path: 'questions',
      model: 'question',
    });

    if (userExam.user_answer_id._id.toString() !== userAnswerId) {
      throw new HttpException(400, 'UserAnswer is not belong to UserExam', 'USER_ANSWER_IS_NOT_BELONG_TO_USER_EXAM');
    }

    if (userExam.is_completed) {
      throw new HttpException(400, 'UserExam is completed', 'USER_EXAM_IS_COMPLETED');
    }

    if (userExam.duration) {
      const { duration } = userExam;
      //duration is in milliseconds
      const time = new Date().getTime() - userExam.updated_at.getTime();
      if (time > duration && !userExam.is_completed) {
        calculateScore(userExam._id, userExam.user_answer_id._id);

        throw new HttpException(400, 'Time is up', 'TIME_IS_UP');
      }
    }
    const data = await UserAnswerModel.findByIdAndUpdate(
      {
        _id: userAnswerId,
      },
      {
        $set: {
          [`answers_id.${input.position}`]: input.answer_id,
        },
      }
    );

    if (userExam.questions[input.position].correct_answer.toString() === input.answer_id) {
      await UserExamModel.findOne({ _id: user_exam_id }, {});
    }

    return data;
  } catch (error) {
    logger.error(`Error while update UserAnswer: ${error}`);
    throw new HttpException(400, error?.message, error?.errorCode || ErrorCodes.BAD_REQUEST.CODE);
  }
};
