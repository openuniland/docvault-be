import { ObjectId } from 'mongoose';

import { ErrorCodes, HttpException } from 'exceptions';
import UserExamModel from 'models/schema/UserExam';
import { logger } from 'utils/logger';
import { UserExamDto, UserExamFilter } from './dto/UserExamDto';
import { getExamById } from 'apis/v1/exam/service';
import { createUserAnswer } from 'apis/v1/userAnswer/service';

export const createUserExam = async (input: UserExamDto, author: ObjectId) => {
  try {
    const exam = await getExamById(input.exam_id);
    const userAnswer = await createUserAnswer({
      number_of_answers: exam?.questions?.length,
      user_exam_id: input.exam_id,
    });

    const userExam = {
      author,
      questions: exam.questions,
      user_answer_id: userAnswer._id,
      duration: input.duration,
      semester: exam.semester,
      school_year: exam.school_year,
    };
    const result = await UserExamModel.create(userExam);
    logger.info(`Create a user exam succesfully`);

    return result;
  } catch (error) {
    logger.error(`Error while create user exam: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
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

export const getAllUserExams = async () => {
  try {
    const result = await UserExamModel.find()
      .populate('author', '-is_blocked -roles -created_at -updated_at -__v')
      .populate({
        path: 'questions',
        model: 'question',
        populate: [
          {
            path: 'subject',
            model: 'subject',
          },
          {
            path: 'correct_answer',
            model: 'answer',
          },
          {
            path: 'answers',
            model: 'answer',
          },
        ],
      })
      .populate('user_answer_id');

    logger.info(`Get all user exams successfully`);

    return result;
  } catch (error) {
    logger.error(`Error while get all user exams : ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getAllUserExamsOfUser = async (userId: ObjectId, filter: UserExamFilter) => {
  try {
    const result = await UserExamModel.find({ author: userId, ...filter })
      .populate('author', '-is_blocked -roles -created_at -updated_at -__v')
      .populate({
        path: 'questions',
        model: 'question',
        populate: [
          {
            path: 'subject',
            model: 'subject',
          },
          {
            path: 'correct_answer',
            model: 'answer',
          },
          {
            path: 'answers',
            model: 'answer',
          },
        ],
      })
      .populate('user_answer_id');

    logger.info(`Get all user exams successfully`);

    return result;
  } catch (error) {
    logger.error(`Error while get all user exams : ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getUserExamOfUser = async (userEmail: string, userExamId: string) => {
  try {
    const result = await UserExamModel.findOne({ _id: userExamId })
      .populate('author', '-is_blocked -roles -created_at -updated_at -__v')
      .populate({
        path: 'questions',
        model: 'question',
        populate: [
          {
            path: 'subject',
            model: 'subject',
          },
          {
            path: 'correct_answer',
            model: 'answer',
          },
          {
            path: 'answers',
            model: 'answer',
          },
        ],
      })
      .populate('user_answer_id');

    if (result.author.email !== userEmail) {
      throw new HttpException(403, 'not allowed', ErrorCodes.BAD_REQUEST.CODE);
    }

    logger.info(`Get all user exams successfully`);
    return result;
  } catch (error) {
    logger.error(`Error while get all user exams : ${error}`);
    throw new HttpException(
      error.status || 400,
      error.message || ErrorCodes.BAD_REQUEST.MESSAGE,
      ErrorCodes.BAD_REQUEST.CODE
    );
  }
};

export const submitTheExam = async (userId: ObjectId, userExamId: ObjectId) => {
  try {
    const result = await UserExamModel.findOneAndUpdate({ _id: userExamId, author: userId }, { is_completed: true });
    logger.info(`Submit the exam successfully`);

    return result;
  } catch (error) {
    logger.error(`Error while submit the exam: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};
