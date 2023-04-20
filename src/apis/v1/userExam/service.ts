/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectId } from 'mongodb';
import { PipelineStage } from 'mongoose';
import { ErrorCodes, HttpException } from 'exceptions';
import UserExamModel from 'models/schema/UserExam';
import { logger } from 'utils/logger';
import { SubmitTheExamDto, UserExamDto, UserExamFilter } from './dto/UserExamDto';
import { getExamById } from 'apis/v1/exam/service';
import { createUserAnswer } from 'apis/v1/userAnswer/service';
import { UserAnswerModel } from 'models';
import Question from 'models/types/Question';
import URLParams from 'utils/rest/urlparams';
import { DEFAULT_PAGING } from 'utils/constants';
import UserExam from 'models/types/UserExam';
import { hideUserInfoIfRequired } from 'utils';

export const createUserExam = async (input: UserExamDto, author: string, userRank: string, userEmail: string) => {
  try {
    const exam = await getExamById(input.exam_id, userRank, userEmail);
    if (exam?.notice?.code === 'PERMISSION_DENIED') {
      return {
        notice: exam?.notice,
      };
    }

    const userAnswer = await createUserAnswer({
      number_of_answers: exam?.questions?.length,
      user_exam_id: input.exam_id,
    });

    const userExam = {
      author,
      original_exam: input.exam_id,
      title: exam?.title,
      subject: exam?.subject,
      questions: exam?.questions,
      user_answer_id: userAnswer?._id,
      duration: input.duration,
      semester: exam?.semester,
      school_year: exam?.school_year,
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

export const calculateScore = async (userExam: UserExam, userAnswerId: string) => {
  try {
    const userAnswer = await UserAnswerModel.findOne({ _id: userAnswerId });

    let score = 0;

    for (let i = 0; i < userExam?.questions.length; i++) {
      if (userExam?.questions[i].correct_answer.id === userAnswer.answers_id[i]) {
        score++;
      }
    }

    await UserExamModel.findOneAndUpdate({ _id: userExam?._id }, { is_completed: true, score });

    return score;
  } catch (error) {
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const deleteUserExam = async (id: string) => {
  try {
    const userExam = await UserExamModel.updateOne({ _id: id }, { deleted_at: new Date(), is_deleted: true });
    logger.info(`Delete user exam successfully`);

    return userExam;
  } catch (error) {
    logger.error(`Error while delete user exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getAllUserExamsByAdmin = async (urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;

    const order = urlParams.order || 'DESC';

    const count = UserExamModel.countDocuments();
    const result = UserExamModel.aggregate([
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
        $lookup: {
          from: 'subject',
          localField: 'subject',
          foreignField: '_id',
          as: 'subject',
        },
      },
      {
        $unwind: '$subject',
      },
      {
        $project: {
          'author.is_blocked': 0,
          'author.roles': 0,
          'author.created_at': 0,
          'author.updated_at': 0,
          'author.__v': 0,
          'questions.author': 0,
        },
      },
      {
        $sort: { created_at: order === 'DESC' ? -1 : 1 },
      },
      {
        $skip: Number(pageSize * currentPage),
      },
      {
        $limit: Number(pageSize),
      },
    ]);

    logger.info(`Get all user exams successfully`);

    const resolveAll = await Promise.all([count, result]);
    return {
      meta: {
        total: resolveAll[0],
        pageSize,
        currentPage,
      },
      result: resolveAll[1],
    };
  } catch (error) {
    logger.error(`Error while get all user exams : ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getAllUserExamsByOwner = async (userId: string, filter: UserExamFilter, urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;

    const order = urlParams.order || 'DESC';
    const _id = new ObjectId(userId);

    const count = UserExamModel.countDocuments({ author: userId, ...filter });

    let matchCondition: any = [{ author: _id }];
    switch (filter.is_completed) {
      case 'true':
        matchCondition.push({ is_completed: true });
        break;
      case 'false':
        matchCondition.push({ is_completed: false });
        break;
      default:
        break;
    }

    const pipeline: PipelineStage[] = [
      {
        $match: {
          $and: matchCondition,
        },
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
        $lookup: {
          from: 'subject',
          localField: 'subject',
          foreignField: '_id',
          as: 'subject',
        },
      },
      {
        $lookup: {
          from: 'user_answer',
          localField: 'user_answer_id',
          foreignField: '_id',
          as: 'user_answers',
        },
      },
      {
        $unwind: '$subject',
      },
      {
        $project: {
          'author.is_blocked': 0,
          'author.roles': 0,
          'author.created_at': 0,
          'author.updated_at': 0,
          'author.__v': 0,
          'questions.author': 0,
        },
      },
      {
        $sort: { created_at: order === 'DESC' ? -1 : 1 },
      },
      {
        $skip: Number(pageSize * currentPage),
      },
      {
        $limit: Number(pageSize),
      },
    ];

    const result = UserExamModel.aggregate(pipeline);

    logger.info(`Get all user exams successfully`);

    const resolveAll = await Promise.all([count, result]);

    return {
      meta: {
        total: resolveAll[0],
        pageSize,
        currentPage,
      },
      result: resolveAll[1].map((userExam: any) => {
        return { ...userExam, author: hideUserInfoIfRequired(userExam?.author) };
      }),
    };
  } catch (error) {
    logger.error(`Error while get all user exams : ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getUserExamByOwner = async (userEmail: string, userExamId: string) => {
  try {
    const _id = new ObjectId(userExamId);

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
        $lookup: {
          from: 'subject',
          localField: 'subject',
          foreignField: '_id',
          as: 'subject',
        },
      },
      {
        $lookup: {
          from: 'user_answer',
          localField: 'user_answer_id',
          foreignField: '_id',
          as: 'user_answers',
        },
      },
      {
        $unwind: '$subject',
      },
      {
        $unwind: '$author',
      },
      {
        $project: {
          'author.is_blocked': 0,
          'author.roles': 0,
          'author.created_at': 0,
          'author.updated_at': 0,
          'author.__v': 0,
          'questions.author': 0,
          'user_answers.is_deleted': 0,
          'user_answers.deleted_at': 0,
        },
      },
    ];
    const userExam = await UserExamModel.aggregate(pipeline);

    if (userExam[0]?.author?.email !== userEmail) {
      throw new HttpException(403, 'not allowed', ErrorCodes.BAD_REQUEST.CODE);
    }

    if (userExam[0]?.is_completed) {
      return { ...userExam[0], author: hideUserInfoIfRequired(userExam[0]?.author) };
    }

    //duration is in milliseconds
    const time = new Date().getTime() - userExam[0].updated_at.getTime();
    const { duration } = userExam[0];

    if (time > duration && !userExam[0].is_completed) {
      const score = await calculateScore(userExam[0], userExam[0]?.user_answers?._id);

      return {
        ...userExam[0],
        score,
        is_completed: true,
      };
    }

    logger.info(`Get userExam of user successfully`);

    return {
      ...userExam[0],
      questions: userExam[0].questions.map((question: Question) => {
        return {
          answers: question?.answers,
          content: question?.content,
          _id: question._id,
        };
      }),
      author: hideUserInfoIfRequired(userExam[0]?.author),
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

export const submitTheExam = async (input: SubmitTheExamDto, userEmail: string) => {
  try {
    const _id = new ObjectId(input.user_exam_id);

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
          'author.is_blocked': 0,
          'author.roles': 0,
          'author.created_at': 0,
          'author.updated_at': 0,
          'author.__v': 0,
          'questions.author': 0,
        },
      },
    ];
    const userExam = await UserExamModel.aggregate(pipeline);

    if (userExam[0]?.author?.email !== userEmail) {
      throw new HttpException(403, 'not allowed', ErrorCodes.BAD_REQUEST.CODE);
    }

    await calculateScore(userExam[0], userExam[0]?.user_answer_id);
    logger.info(`Submit the exam successfully`);

    return userExam[0];
  } catch (error) {
    logger.error(`Error while submit the exam: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};
