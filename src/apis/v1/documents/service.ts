import DocumentModel from 'models/schema/Document';
import { logger } from 'utils/logger';
import { ErrorCodes, HttpException } from 'exceptions';
import {
  CreateDocumentRequestForAdmin,
  DocumentDto,
  DocumentFilter,
  ParamsDocumentDto,
  UpdateDocumentByAdminDto,
  UpdateDocumentByOwnerDto,
} from './dto/DocumentsDto';
import { SubjectModel, UserModel } from 'models';
import URLParams from 'utils/rest/urlparams';
import { DEFAULT_PAGING, RANK_TYPE } from 'utils/constants';
import { checkDedicationScoreCompatibility, checkRankCompatibility, hideUserInfoIfRequired } from 'utils';
import DocumentType from 'models/types/Document';

export const getDocuments = async (urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || 'DESC';

    const count = DocumentModel.countDocuments({ is_approved: true });

    const results = DocumentModel.find({ is_approved: true })
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort({ created_at: order === 'DESC' ? -1 : 1 })
      .populate('author', '-is_deleted -is_blocked -roles -created_at -updated_at -__v')
      .populate('subject', '-is_deleted -created_at -updated_at -__v');

    logger.info(`Get all documents successfully`);
    const resolveAll = await Promise.all([count, results]);

    return {
      result: resolveAll[1].map((document: any) => {
        return {
          ...document.toObject(),
          author: hideUserInfoIfRequired(document?.author),
        };
      }),
      meta: {
        total: resolveAll[0],
        pageSize,
        currentPage,
      },
    };
  } catch (error) {
    logger.error(`Error while get documents: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const createDocument = async (input: DocumentDto, author: string) => {
  try {
    const document = {
      author,
      ...input,
    };

    const result = await DocumentModel.create(document);

    logger.info(`Create new document successfully`);
    return result;
  } catch (error) {
    logger.error(`Error while create new document: ${error}`);
    throw new HttpException(400, error?.message, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const createDocumentByAdmin = async (input: CreateDocumentRequestForAdmin, author: string) => {
  try {
    const document = {
      author,
      ...input,
    };

    const result = await DocumentModel.create(document);

    logger.info(`Create new document by admin successfully`);
    return result;
  } catch (error) {
    logger.error(`Error while create new document by admin: ${error}`);
    throw new HttpException(400, error?.message, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateDocumentByOwner = async (input: UpdateDocumentByOwnerDto, documentId: string, ownId: string) => {
  try {
    const Document = await DocumentModel.updateOne(
      { _id: documentId, author: ownId },
      {
        $set: input,
      }
    );

    logger.info(`Update document by own successfully`);
    return Document;
  } catch (error) {
    logger.error(`Error while update document by own: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const deleteDocument = async (id: string) => {
  try {
    const Document = await DocumentModel.updateOne({ _id: id }, { deleted_at: new Date(), is_deleted: true });

    logger.info(`Delete document successfully`);
    return Document;
  } catch (error) {
    logger.error(`Error while create new document: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getDocumentById = async (params: ParamsDocumentDto, userRank: string, userEmail: string) => {
  try {
    const results: any = await DocumentModel.findOne({ _id: params.id })
      .populate('author', '-is_blocked -roles -created_at -updated_at -__v')
      .populate('subject', '-is_deleted -created_at -updated_at -__v');

    const checker = checkRankCompatibility(userRank, results.rank);

    if (!checker) {
      const user = await UserModel.findOne({ email: userEmail });

      return {
        notice: {
          message: 'You do not have permission to view this document',
          code: 'PERMISSION_DENIED',
          minimum_required_rank: results.rank,
          your_rank: userRank,
          your_dedication_score: user?.dedication_score,
          minimum_required_score: RANK_TYPE[results?.rank].score,
        },
      };
    }

    logger.info(`Get a document successfully`);
    return {
      ...results.toObject(),
      author: hideUserInfoIfRequired(results?.author),
    };
  } catch (error) {
    logger.error(`Error while get a document: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getDocumentsByAdmin = async (filter: DocumentFilter, urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || 'DESC';

    const count = DocumentModel.countDocuments({ ...filter });

    const results = DocumentModel.find({ ...filter })
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort({ created_at: order === 'DESC' ? -1 : 1 })
      .populate('author', '-is_deleted -is_blocked -roles -created_at -updated_at -__v')
      .populate('subject', '-is_deleted -created_at -updated_at -__v');

    logger.info(`Get all documents successfully`);

    const resolveAll = await Promise.all([count, results]);
    return {
      result: resolveAll[1].map((document: DocumentType) => {
        return { ...document.toObject(), author: hideUserInfoIfRequired(document?.author) };
      }),
      meta: {
        total: resolveAll[0],
        currentPage,
        pageSize,
      },
    };
  } catch (error) {
    logger.error(`Error while get documents: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getDocumentsBySubjectId = async (subjectId: string, urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || 'DESC';

    const count = DocumentModel.countDocuments({ is_approved: true, subject: subjectId });
    const results = DocumentModel.find({ is_approved: true, subject: subjectId })
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort({ created_at: order === 'DESC' ? -1 : 1 })
      .populate('author', '-is_blocked -roles -created_at -updated_at -__v')
      .populate('subject', '-is_deleted -created_at -updated_at -__v');

    const subject = SubjectModel.findOne({ _id: subjectId });

    const resultAll = await Promise.all([count, results, subject]);

    logger.info(`Get all documents by subjectId successfully`);
    return {
      result: {
        documents: resultAll[1].map((document: any) => {
          return { ...document.toObject(), author: hideUserInfoIfRequired(document?.author) };
        }),
        subject: resultAll[2],
      },
      meta: {
        total: resultAll[0],
        currentPage,
        pageSize,
      },
    };
  } catch (error) {
    logger.error(`Error while get documents by subjectId: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getDocumentsByOwner = async (authorId: string, urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;

    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;

    const order = urlParams.order || 'DESC';

    const count = DocumentModel.countDocuments({ author: authorId });

    const results = DocumentModel.find({ author: authorId })
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort({ created_at: order === 'DESC' ? -1 : 1 })
      .populate('author', '-is_blocked -roles -created_at -updated_at -__v')
      .populate('subject', '-is_deleted -created_at -updated_at -__v');

    const resolveAll = await Promise.all([count, results]);
    return {
      result: resolveAll[1].map((document: DocumentType) => {
        return { ...document.toObject(), author: hideUserInfoIfRequired(document?.author) };
      }),
      meta: {
        total: resolveAll[0],
        currentPage,
        pageSize,
      },
    };
  } catch (error) {
    logger.error(`Error while get documents by Owner: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateDocumentByAdmin = async (input: UpdateDocumentByAdminDto, documentId: string) => {
  try {
    const document = await DocumentModel.findByIdAndUpdate(
      { _id: documentId },
      {
        $set: input,
      }
    ).populate('author', '-is_blocked -roles -created_at -updated_at -__v');

    if (input.is_approved === true) {
      const newRank = checkDedicationScoreCompatibility(document.author.dedication_score + 1);
      await UserModel.findByIdAndUpdate({ _id: document.author._id }, { $inc: { dedication_score: 1 }, rank: newRank });
    }

    if (input.is_approved === false) {
      const newRank = checkDedicationScoreCompatibility(document.author.dedication_score - 1);
      const newDedicationScore = document?.author?.dedication_score > 0 ? -1 : 0;

      await UserModel.findByIdAndUpdate(
        { _id: document.author._id },
        { $inc: { dedication_score: newDedicationScore }, rank: newRank }
      );
    }

    logger.info(`Update document by admin successfully`);
    return document;
  } catch (error) {
    logger.error(`Error while update document by admin: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
