import { ObjectId } from 'mongoose';

import { ErrorCodes, HttpException } from 'exceptions';
import UserExamModel from 'models/schema/UserExam';
import { logger } from 'utils/logger';
import { UserExamDto, UserExamFilter } from './dto/UserExamDto';
import { getExamById } from 'apis/v1/exam/service';
import { createUserAnswer } from 'apis/v1/userAnswer/service';
import { UserAnswerModel } from 'models';
import Question from 'models/types/Question';

export const createUserExam = async (input: UserExamDto, author: ObjectId) => {
  try {
    const exam = await getExamById(input.exam_id);
    const userAnswer = await createUserAnswer({
      number_of_answers: exam?.questions?.length,
      user_exam_id: input.exam_id,
    });

    const userExam = {
      author,
      original_exam: input.exam_id,
      subject: exam.subject,
      title: exam.title,
      questions: exam.questions,
      user_answer_id: userAnswer._id,
      duration: input.duration,
      semester: exam.semester,
      school_year: exam.school_year,
    };
    const result = await UserExamModel.create(userExam);
    logger.info(`Create a user exam succesfully`);

    return {
      _id: result._id,
    };
  } catch (error) {
    logger.error(`Error while create user exam: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const calculateScore = async (userExamId: string, userAnswerId: string) => {
  try {
    const userExam = UserExamModel.findOne({ _id: userExamId }).populate({
      path: 'questions',
      model: 'question',
    });
    const userAnswer = UserAnswerModel.findOne({ _id: userAnswerId });
    const resolveAll = await Promise.all([userExam, userAnswer]);

    let score = 0;

    for (let i = 0; i < resolveAll[0].questions.length; i++) {
      if (resolveAll[0].questions[i].correct_answer.toString() === resolveAll[1].answers_id[i]) {
        score++;
      }
    }

    await UserExamModel.findOneAndUpdate({ _id: userExamId }, { is_completed: true, score });

    return score;
  } catch (error) {
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
    const userExam = await UserExamModel.findOne({ _id: userExamId })
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

    if (userExam?.author?.email !== userEmail) {
      throw new HttpException(403, 'not allowed', ErrorCodes.BAD_REQUEST.CODE);
    }

    if (userExam?.is_completed) {
      return userExam;
    }

    //duration is in milliseconds
    const time = new Date().getTime() - userExam.updated_at.getTime();
    const { duration } = userExam;

    if (time > duration && !userExam.is_completed) {
      const score = await calculateScore(userExam._id, userExam.user_answer_id._id);

      return {
        ...userExam,
        score,
        is_completed: true,
      };
    }

    logger.info(`Get userExam of user successfully`);
    return {
      ...userExam.toObject(),
      questions: userExam.toObject().questions.map((question: Question) => {
        return {
          answers: question?.answers,
          subject: question?.subject,
          content: question?.content,
          _id: question._id,
        };
      }),
    };
  } catch (error) {
    logger.error(`Error while get userExam of user : ${error}`);
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
