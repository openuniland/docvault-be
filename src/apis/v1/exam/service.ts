/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectId } from 'mongodb';
import { PipelineStage } from 'mongoose';
import { ErrorCodes, HttpException } from 'exceptions';
import { ExamModel, UserModel } from 'models';
import { DEFAULT_PAGING, RANK_TYPE } from 'utils/constants';
import { logger } from 'utils/logger';
import URLParams from 'utils/rest/urlparams';
import { ExamDto, UpdateExamByAdminDto, UpdateExamByOwnerDto } from './dto/ExamDto';
import { checkDedicationScoreCompatibility, checkRankCompatibility, hideUserInfoIfRequired } from 'utils';
import Exam from 'models/types/Exam';

//Get all user's exams
export const getExams = async (urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || 'DESC';
    const sort = urlParams.sort || 'created_at';
    const sortObj: any = { [sort]: order === 'DESC' ? -1 : 1 };

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
      {
        $sort: sortObj,
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
      result: resolveAll[1].map((exam: Exam) => {
        return { ...exam, author: hideUserInfoIfRequired(exam.author) };
      }),
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
export const getExamById = async (id: string, userRank: string, userEmail: string) => {
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
          is_approved: 1,
          school_year: 1,
          semester: 1,
          author: {
            _id: '$author._id',
            fullname: '$author.fullname',
            email: '$author.email',
            nickname: '$author.nickname',
            is_show_info: '$author.is_show_info',
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
          rank: 1,
        },
      },
    ]);

    const checker = checkRankCompatibility(userRank, data[0].rank);

    if (!checker) {
      const user = await UserModel.findOne({ email: userEmail });

      return {
        notice: {
          message: 'You do not have permission to view this document',
          code: 'PERMISSION_DENIED',
          minimum_required_rank: data[0].rank,
          your_rank: userRank,
          your_dedication_score: user?.dedication_score,
          minimum_required_score: RANK_TYPE[data[0]?.rank].score,
        },
      };
    }

    return {
      ...data[0],
      author: hideUserInfoIfRequired(data[0].author),
    };
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
    const sort = urlParams.sort || 'created_at';
    const sortObj: any = { [sort]: order === 'DESC' ? -1 : 1 };

    const _id = new ObjectId(subjectId);
    const count = ExamModel.countDocuments({ subject: subjectId });
    const data = ExamModel.aggregate([
      {
        $match: { subject: _id, is_approved: true },
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
        $unwind: '$author',
      },
      {
        $project: {
          'author.is_blocked': 0,
          'author.roles': 0,
          'author.created_at': 0,
          'author.updated_at': 0,
          'author.__v': 0,
          questions: 0,
        },
      },
      {
        $sort: sortObj,
      },
      {
        $skip: Number(pageSize * currentPage),
      },
      {
        $limit: Number(pageSize),
      },
    ]);

    const resolveAll = await Promise.all([count, data]);
    const subject = resolveAll[1]?.length > 0 ? resolveAll[1][0]?.subject : null;

    return {
      result: {
        exams: resolveAll[1].map((exam: Exam) => {
          return { ...exam, author: hideUserInfoIfRequired(exam?.author) };
        }),
        subject,
      },

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
export const getExamsByOwner = async (authorId: string, urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || 'DESC';
    const sort = urlParams.sort || 'created_at';
    const sortObj: any = { [sort]: order === 'DESC' ? -1 : 1 };

    const _id = new ObjectId(authorId);
    const count = ExamModel.countDocuments({ author: authorId });
    const data = ExamModel.aggregate([
      {
        $match: { author: _id },
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
      {
        $sort: sortObj,
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
      result: resolveAll[1].map((exam: any) => {
        return { ...exam, author: hideUserInfoIfRequired(exam?.author) };
      }),
      meta: {
        total: resolveAll[0],
        currentPage,
        pageSize,
      },
    };
  } catch (error) {
    logger.error(`Error while get exam by Owner: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
export const createExam = async (input: ExamDto, author: string) => {
  try {
    const exam = {
      author,
      ...input,
    };
    const DraftExamExist = await ExamModel.findOne({
      author,
      is_draft: true,
    }).sort({ created_at: -1 });

    if (DraftExamExist) {
      return DraftExamExist;
    }

    const data = await ExamModel.create(exam);

    return data;
  } catch (error) {
    logger.error(`Error while create exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateExamByOwner = async (examId: string, ownId: string, input: UpdateExamByOwnerDto) => {
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
    ).populate('author', '-is_blocked -roles -created_at -updated_at -__v');

    if (input.is_approved === true) {
      const newRank = checkDedicationScoreCompatibility(data.author.dedication_score + 1);
      await UserModel.findByIdAndUpdate({ _id: data.author._id }, { $inc: { dedication_score: 1 }, rank: newRank });
    }

    if (input.is_approved === false) {
      const newRank = checkDedicationScoreCompatibility(data.author.dedication_score - 1);
      const newDedicationScore = data?.author?.dedication_score > 0 ? -1 : 0;

      await UserModel.findByIdAndUpdate(
        { _id: data.author._id },
        { $inc: { dedication_score: newDedicationScore }, rank: newRank }
      );
    }

    return data;
  } catch (error) {
    logger.error(`Error while update exam by admin: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getDraftExam = async (author: string) => {
  try {
    const _id = new ObjectId(author);

    const pipeline: PipelineStage[] = [
      {
        $match: { author: _id, is_draft: true },
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
        $project: {
          _id: 1,
          title: 1,
          description: 1,
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
      {
        $sort: { created_at: -1 },
      },
    ];
    const data = await ExamModel.aggregate(pipeline);

    return data[0];
  } catch (error) {
    logger.error(`Error while create exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
