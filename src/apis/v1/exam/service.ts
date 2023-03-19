import { ErrorCodes, HttpException } from 'exceptions';
import { ExamModel, SubjectModel } from 'models';
import { ObjectId } from 'mongoose';
import { DEFAULT_PAGING } from 'utils/constants';
import { logger } from 'utils/logger';
import URLParams from 'utils/rest/urlparams';
import { ExamDto, UpdateExamDto } from './dto/ExamDto';

//Get all user's exams
export const getExams = async (urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;

    const order = urlParams.order || 'DESC';

    const count = ExamModel.countDocuments();
    const data = ExamModel.find()
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort({ created_at: order === 'DESC' ? -1 : 1 })
      .populate('author', '-is_blocked -roles -created_at -updated_at -__v')
      .populate({
        path: 'questions',
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
      .populate('subject');

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
  try {
    const data = await ExamModel.findById({ _id: id })
      .populate('author', '-is_blocked -roles -created_at -updated_at -__v')
      .populate({
        path: 'questions',
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
      .populate('subject');

    return data;
  } catch (error) {
    logger.error(`Error while get exam: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getExamBySubject = async (input: string, urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || 'DESC';

    const subjectId = await SubjectModel.findOne({ subject_name: input });

    const count = ExamModel.countDocuments({ subject: subjectId });
    const data = ExamModel.find({ subject: subjectId })
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort({ created_at: order === 'DESC' ? -1 : 1 })
      .populate('author')
      .populate({
        path: 'questions',
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
      .populate('subject');

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
    logger.error(`Error while get exam by subject: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const createExam = async (input: ExamDto, author: ObjectId) => {
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

export const updateExam = async (id: string, input: UpdateExamDto) => {
  try {
    const data = await ExamModel.findByIdAndUpdate(
      {
        _id: id,
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
    const data = await ExamModel.findOneAndDelete({ _id: id });

    return data;
  } catch (error) {
    logger.error(`Error while delete exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getExamsBySubjectId = async (subjectId: string) => {
  try {
    const results = ExamModel.find({ is_approved: true, subject: subjectId })
    .populate('author', '-is_blocked -roles -created_at -updated_at -__v')
      .populate('questions', '-is_blocked -roles -created_at -updated_at -__v')
      .populate('subject', '-is_deleted -created_at -updated_at -__v');

    const subject = SubjectModel.findOne({ _id: subjectId });

    const resultAll = await Promise.all([results, subject]);

    logger.info(`Get all exams by subjectId successfully`);
    return {
      exams: resultAll[0],
      subject: resultAll[1],
    };
  } catch (error) {
    logger.error(`Error while get exams by subjectId: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
