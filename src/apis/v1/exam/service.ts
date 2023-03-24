/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectId } from 'mongodb';
import { ObjectId as ObjectIdType } from 'mongoose';
import { ErrorCodes, HttpException } from 'exceptions';
import { ExamModel } from 'models';
import { DEFAULT_PAGING } from 'utils/constants';
import { logger } from 'utils/logger';
import URLParams from 'utils/rest/urlparams';
import { ExamDto, UpdateExamByAdminDto, UpdateExamByOwnerDto } from './dto/ExamDto';

//Get all user's exams
export const getExams = async (urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;

    const order = urlParams.order || 'DESC';

    const count = ExamModel.countDocuments();
    const data = ExamModel.aggregate([
      {
        $lookup: {
          from: 'question',
          localField: '_id',
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

    const resolveAll = await Promise.all([count, data]);
    return {
      result: resolveAll[1],
      meta: {
        total: resolveAll[0],
        pageSize,
        currentPage,
      },
    };
  } catch (error) {
    logger.error(`Error while get all exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

//Get a user's exam by id
export const getExamById = async (id: string) => {
  const _id = new ObjectId(id);
  try {
    const data = await ExamModel.aggregate([
      {
        $match: { _id },
      },
      {
        $lookup: {
          from: 'question',
          localField: '_id',
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
        $unwind: '$author',
      },
      {
        $unwind: '$subject',
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          author: {
            _id: '$author._id',
            fullname: '$author.fullname',
            email: '$author.email',
          },
          subject: {
            _id: '$subject._id',
            subject_name: '$subject.subject_name',
          },
          questions: {
            $map: {
              input: '$questions',
              as: 'question',
              in: {
                _id: '$$question._id',
                content: '$$question.content',
                image: '$$question.image',
                correct_answer: '$$question.correct_answer',
                answers: '$$question.answers',
                is_essay: '$$question.is_essay',
                accuracy: '$$question.accuracy',
              },
            },
          },
        },
      },
    ]);

    return data[0];
  } catch (error) {
    logger.error(`Error while get exam: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getExamsBySubjectId = async (subjectId: string, urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || 'DESC';

    const _id = new ObjectId(subjectId);
    const count = ExamModel.countDocuments({ subject: subjectId });
    const data = ExamModel.aggregate([
      {
        $match: { subject: _id },
      },
      {
        $lookup: {
          from: 'question',
          localField: '_id',
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

    const resolveAll = await Promise.all([count, data]);

    return {
      result: resolveAll[1],
      meta: {
        total: resolveAll[0],
        pageSize,
        currentPage,
      },
    };
  } catch (error) {
    logger.error(`Error while get exam by subjectId: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const createExam = async (input: ExamDto, author: ObjectIdType) => {
  try {
    const exam = {
      author,
      ...input,
    };
    const data = await ExamModel.create(exam);

    return data;
  } catch (error) {
    logger.error(`Error while create exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateExamByOwner = async (examId: string, ownId: ObjectIdType, input: UpdateExamByOwnerDto) => {
  try {
    const data = await ExamModel.updateOne(
      {
        _id: examId,
        author: ownId,
      },
      {
        $set: input,
      }
    );

    return data;
  } catch (error) {
    logger.error(`Error while update exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const deleteExam = async (id: string) => {
  try {
    const data = await ExamModel.updateOne({ _id: id }, { deleted_at: new Date(), is_deleted: true });

    return data;
  } catch (error) {
    logger.error(`Error while delete exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateExamByAdmin = async (examId: string, input: UpdateExamByAdminDto) => {
  try {
    const data = await ExamModel.findOneAndUpdate(
      {
        _id: examId,
      },
      {
        $set: input,
      }
    );

    return data;
  } catch (error) {
    logger.error(`Error while update exam by admin: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
