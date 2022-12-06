import { ErrorCodes, HttpException } from 'exceptions';
import { ExamModel } from 'models';
import {
  ParamGetExamDto,
  GetExamsOfSubjectDto,
  ExamDto,
  UpdateExamDto,
  ParamDeleteExamDto,
  ParamUpdateExamDto,
} from './dto/Exams';
import { logger } from 'utils/logger';

export const getExams = async () => {
  try {
    const data = await ExamModel.find();

    return data;
  } catch (error) {
    logger.error(`Error while get exams: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getExam = async (input: ParamGetExamDto) => {
  try {
    const { id } = input;
    const data = await ExamModel.findById(id).populate('question').populate('subject');

    return data;
  } catch (error) {
    logger.error(`Error while get a exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getExamOfSubject = async (input: GetExamsOfSubjectDto) => {
  try {
    const { subjectId } = input;
    const data = await ExamModel.findOne({
      subject: subjectId,
    })
      .populate('question')
      .populate('subject');

    return data;
  } catch (error) {
    logger.error(`Error while get all exams of subject: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const createExam = async (input: ExamDto) => {
  try {
    const data = await ExamModel.create(input);

    return data;
  } catch (error) {
    logger.error(`Error while create a exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateExam = async (input: UpdateExamDto, id: ParamUpdateExamDto) => {
  try {
    const data = await ExamModel.findByIdAndUpdate(id, {
      $set: input,
    });

    return data;
  } catch (error) {
    logger.error(`Error while update a exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const deleteExam = async (input: ParamDeleteExamDto) => {
  try {
    const { id } = input;
    const data = await ExamModel.findOneAndDelete({ _id: id });

    return data;
  } catch (error) {
    logger.error(`Error while delete a exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
