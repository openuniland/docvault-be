/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectId } from 'mongodb';

import { ErrorCodes, HttpException } from 'exceptions';
import { UserAnswerModel } from 'models';
import UserExamModel from 'models/schema/UserExam';
import { PipelineStage } from 'mongoose';
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

export const updateUserAnswer = async (userAnswerId: string, input: UpdateUserAnswerDto, userEmail: string) => {
  try {
    const { user_exam_id } = input;

    const _id = new ObjectId(user_exam_id.toString());
    const pipeline: PipelineStage[] = [
      {
        $match: { _id },
      },
      {
        $lookup: {
          from: 'question',
          localField: 'original_exam',
          foreignField: 'exam_id',
          as: 'questions',
        },
      },
      {
        $lookup: {
          from: 'user',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $unwind: '$author',
      },
      {
        $project: {
          'questions.author': 0,
        },
      },
    ];
    const userExam = await UserExamModel.aggregate(pipeline);

    if (userExam[0]?.author?.email !== userEmail) {
      throw new HttpException(403, 'not allowed', ErrorCodes.BAD_REQUEST.CODE);
    }

    if (userExam[0].user_answer_id.toString() !== userAnswerId) {
      throw new HttpException(400, 'UserAnswer is not belong to UserExam', 'USER_ANSWER_IS_NOT_BELONG_TO_USER_EXAM');
    }

    if (userExam[0].is_completed) {
      throw new HttpException(400, 'UserExam is completed', 'USER_EXAM_IS_COMPLETED');
    }

    if (userExam[0].duration) {
      const { duration } = userExam[0];
      //duration is in milliseconds
      const time = new Date().getTime() - userExam[0].updated_at.getTime();
      if (time > duration && !userExam[0].is_completed) {
        calculateScore(userExam[0], userExam[0].user_answer_id);

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

    if (userExam[0].questions[input.position].correct_answer.toString() === input.answer_id) {
      await UserExamModel.findOne({ _id: user_exam_id }, {});
    }

    return data;
  } catch (error) {
    logger.error(`Error while update UserAnswer: ${error}`);
    throw new HttpException(400, error?.message, error?.errorCode || ErrorCodes.BAD_REQUEST.CODE);
  }
};
