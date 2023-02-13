import { ErrorCodes, HttpException } from 'exceptions';
import QuestionModel from 'models/schema/Question';
import { logger } from 'utils/logger';

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

export const getQuestions = async function () {
  try {
    const question = await QuestionModel.find().populate('subject').populate('correct_answer').populate('answers');
    logger.info(`Get questions successfully`);

    return question;
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
