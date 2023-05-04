import { ErrorCodes, HttpException } from 'exceptions';
import QuestionModel from 'models/schema/Question';
import { DEFAULT_PAGING } from 'utils/constants';
import { logger } from 'utils/logger';
import URLParams from 'utils/rest/urlparams';
import { hideUserInfoIfRequired } from 'utils';

import { QuestionDto, UpdateQuestionDto } from './dto/QuestionDto';
import { ExamModel } from 'models';

export const createQuestion = async function (input: QuestionDto, author: string) {
  try {
    const data = {
      author,
      ...input,
    };
    const question = await QuestionModel.create(data);
    logger.info(`Create question successfully`);

    return question;
  } catch (error) {
    logger.error(`Error while create new question: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getQuestions = async function (urlParams: URLParams) {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || 'DESC';
    const sort = urlParams.sort || 'created_at';
    const sortObj: any = { [sort]: order === 'DESC' ? -1 : 1 };

    const count = QuestionModel.countDocuments();
    const question = QuestionModel.find()
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort(sortObj);
    logger.info(`Get questions successfully`);

    const resolveAll = await Promise.all([count, question]);
    return {
      result: resolveAll[1],
      meta: {
        total: resolveAll[0],
        pageSize,
        currentPage,
      },
    };
  } catch (error) {
    logger.error(`Error while get questions: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateQuestionByOwner = async function (input: UpdateQuestionDto, id: string, ownerId: string) {
  try {
    const question = await QuestionModel.updateOne(
      { _id: id, author: ownerId },
      {
        $set: input,
      }
    );
    logger.info(`Update question by owner successfully`);

    return question;
  } catch (error) {
    logger.error(`Error while update question by owner: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateQuestionByAdmin = async function (input: UpdateQuestionDto, id: string) {
  try {
    const question = await QuestionModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: input,
      }
    );
    logger.info(`Update question by admin successfully`);

    return question;
  } catch (error) {
    logger.error(`Error while update question by admin: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const deleteQuestion = async function (id: string) {
  try {
    const question = await QuestionModel.updateOne({ _id: id }, { deleted_at: new Date(), is_deleted: true });
    logger.info(`Delete question successfully`);

    return question;
  } catch (error) {
    logger.error(`Error while delete question: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getQuestionsByExamId = async function (examId: string) {
  try {
    const data = await QuestionModel.find({ exam_id: examId });

    const exam = ExamModel.findOne({ _id: examId })
      .populate('subject', '-is_deleted -created_at -updated_at -__v')
      .populate('author', '-is_blocked -roles -created_at -updated_at -__v');
    const resultAll = await Promise.all([data, exam]);

    return {
      questions: resultAll[0],
      exam: {
        ...resultAll[1].toObject(),
        author: hideUserInfoIfRequired(resultAll[1].author),
      },
    };
  } catch (error) {
    logger.error(`Error while get questions by examId: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
