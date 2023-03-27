import { ObjectId } from 'mongoose';

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
import { SubjectModel } from 'models';
import URLParams from 'utils/rest/urlparams';
import { DEFAULT_PAGING } from 'utils/constants';
import { hideUserInfoIfRequired } from 'utils';
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

export const createDocument = async (input: DocumentDto, author: ObjectId) => {
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

export const createDocumentByAdmin = async (input: CreateDocumentRequestForAdmin, author: ObjectId) => {
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

export const updateDocumentByOwner = async (input: UpdateDocumentByOwnerDto, documentId: string, ownId: ObjectId) => {
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

export const getDocumentById = async (params: ParamsDocumentDto) => {
  try {
    const results: any = await DocumentModel.findOne({ _id: params.id })
      .populate('author', '-is_blocked -roles -created_at -updated_at -__v')
      .populate('subject', '-is_deleted -created_at -updated_at -__v');

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

export const getDocumentsBySubjectId = async (subjectId: string) => {
  try {
    const results = DocumentModel.find({ is_approved: true, subject: subjectId })
      .populate('author', '-is_blocked -roles -created_at -updated_at -__v')
      .populate('subject', '-is_deleted -created_at -updated_at -__v');

    const subject = SubjectModel.findOne({ _id: subjectId });

    const resultAll = await Promise.all([results, subject]);

    logger.info(`Get all documents by subjectId successfully`);
    return {
      documents: resultAll[0].map((documents: any) => {
        return { ...documents.toObject(), author: hideUserInfoIfRequired(documents?.author) };
      }),
      subject: resultAll[1],
    };
  } catch (error) {
    logger.error(`Error while get documents by subjectId: ${error}`);
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
    );

    logger.info(`Update document by admin successfully`);
    return document;
  } catch (error) {
    logger.error(`Error while update document by admin: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
