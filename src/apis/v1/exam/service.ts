import { ErrorCodes, HttpException } from 'exceptions';
import { ExamModel, SubjectModel } from 'models';
import { logger } from 'utils/logger';
import { ExamDto, UpdateExamDto } from './dto/ExamDto';

export const getExams = async () => {
  try {
    const data = await ExamModel.find()
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
    logger.error(`Error while get all exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

//Get user's exam that posted by user id
export const getUserExamsPostedByUserId = async (userId: string) => {
  try {
    const data = await ExamModel.find({ author: userId })
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

    return data;
  } catch (error) {
    logger.error(`Error while get exam by user id: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getExamById = async (id: string) => {
  try {
    const data = await ExamModel.findById({ _id: id })
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

    return data;
  } catch (error) {
    logger.error(`Error while get exam: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getExamBySubject = async (input: string) => {
  try {
    const subjectId = await SubjectModel.findOne({ subject_name: input });
    const data = await ExamModel.find({ subject: subjectId })
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

    return data;
  } catch (error) {
    logger.error(`Error while get exam by subject: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const createExam = async (input: ExamDto) => {
  try {
    const data = await ExamModel.create(input);

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
