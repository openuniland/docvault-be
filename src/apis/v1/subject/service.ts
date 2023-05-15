import { ErrorCodes, HttpException } from 'exceptions';
import { DocumentModel, ExamModel, SubjectModel } from 'models';
import { DEFAULT_PAGING } from 'utils/constants';
import { logger } from 'utils/logger';
import URLParams from 'utils/rest/urlparams';
import { SubjectDto, UpdateSubjectDto, QuerySubjectDto } from './dto/SubjectDto';
import Subject from 'models/types/Subject';

export const getSubjects = async (input: QuerySubjectDto, urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || 'DESC';
    const sort = urlParams.sort || 'created_at';
    const sortObj: any = { [sort]: order === 'DESC' ? -1 : 1 };

    const count = SubjectModel.countDocuments(input);
    const data = SubjectModel.find(input)
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort(sortObj);

    const resolveAll = await Promise.all([count, data]);

    let countData: any = [];

    if (input?.topic === 'documents') {
      const res = resolveAll[1].map((item: Subject) => {
        return DocumentModel.count({ subject: item?._id, is_approved: true });
      });

      countData = await Promise.all(res);
    }

    if (input?.topic === 'exams') {
      const res = resolveAll[1].map((item: Subject) => {
        return ExamModel.count({ subject: item?._id, is_approved: true });
      });

      countData = await Promise.all(res);
    }

    const result = resolveAll[1].map((item, index) => {
      return {
        ...item.toObject(),
        count: countData[index],
      };
    });

    return {
      result,
      meta: {
        total: resolveAll[0],
        pageSize,
        currentPage,
      },
    };
  } catch (error) {
    logger.error(`Error while get subjects: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const createSubject = async (input: SubjectDto) => {
  try {
    const data = await SubjectModel.create(input);

    return data;
  } catch (error) {
    logger.error(`Error while create subject: ${error}`);
    throw new HttpException(
      400,
      error?.message || ErrorCodes.BAD_REQUEST.MESSAGE,
      error?.code || ErrorCodes.BAD_REQUEST.CODE
    );
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
    const data = await SubjectModel.updateOne({ _id: id }, { deleted_at: new Date(), is_deleted: true });

    return data;
  } catch (error) {
    logger.error(`Error while delete subject: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getSubjectById = async (subjectId: string) => {
  try {
    const data = await SubjectModel.findOne({ _id: subjectId });

    return data;
  } catch (error) {
    logger.error(`Error while get a subject by id: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
