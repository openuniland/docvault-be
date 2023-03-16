import { ErrorCodes, HttpException } from 'exceptions';
import QuestionModel from 'models/schema/Question';
import { DEFAULT_PAGING } from 'utils/constants';
import { logger } from 'utils/logger';
import URLParams from 'utils/rest/urlparams';

import { QuestionDto, UpdateQuestionDto } from './dto/QuestionDto';

export const createQuestion = async function (input: QuestionDto) {
  try {
    const question = await QuestionModel.create(input);
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

    const count = QuestionModel.countDocuments();
    const question = QuestionModel.find()
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .populate('subject')
      .populate('correct_answer')
      .populate('answers');
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

export const updateQuestion = async function (input: UpdateQuestionDto, id: string) {
  try {
    const question = await QuestionModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          content: input.content,
          image: input.image,
          subject: input.subject,
          correct_answer: input.correct_answer,
          answers: input.answers,
        },
      }
    );
    logger.info(`Update question successfully`);

    return question;
  } catch (error) {
    logger.error(`Error while update question: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const deleteQuestion = async function (id: string) {
  try {
    const question = await QuestionModel.findOneAndDelete({ _id: id });
    logger.info(`Delete question successfully`);

    return question;
  } catch (error) {
    logger.error(`Error while delete question: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
