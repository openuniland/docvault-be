import { ErrorCodes, HttpException } from 'exceptions';
import { SubjectModel } from 'models';
import { logger } from 'utils/logger';
import { SubjectDto, UpdateSubjectDto } from './dto/SubjectDto';

export const getSubjects = async () => {
  try {
    const data = await SubjectModel.find();

    return data;
  } catch (error) {
    logger.error(`Error while get subjects: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getSubjectsIsApprovedFalse = async () => {
  try {
    const data = await SubjectModel.find({ is_approved: false });
    logger.info(`Get subjects with is_approved false successfully`);

    return data;
  } catch (error) {
    logger.error(`Error while get subjects wit is_approve false: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const createSubject = async (input: SubjectDto) => {
  try {
    const data = await SubjectModel.create(input);

    return data;
  } catch (error) {
    logger.error(`Error while create subject: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateSubject = async (input: UpdateSubjectDto, id: string) => {
  try {
    const data = await SubjectModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: input,
      }
    );

    return data;
  } catch (error) {
    logger.error(`Error while update subject: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const deleteSubject = async (id: string) => {
  try {
    const data = await SubjectModel.findOneAndDelete({ _id: id });

    return data;
  } catch (error) {
    logger.error(`Error while delete subject: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
