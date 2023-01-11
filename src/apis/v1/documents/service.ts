import DocumentModel from 'models/schema/Document';
import { ObjectId } from 'mongoose';
import { logger } from 'utils/logger';

import { ErrorCodes, HttpException } from 'exceptions';
import { DocumentDto, ParamsDocumentDto, UpdateDocumentDto } from './dto/DocumentsDto';

export const getDocuments = async () => {
  try {
    const results = await DocumentModel.find()
      .populate('author', '-is_blocked -roles -created_at -updated_at -__v')
      .populate('subject', '-is_deleted -created_at -updated_at -__v');

    logger.info(`Get all documents successfully`);
    return results;
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

export const updateDocument = async (input: UpdateDocumentDto, id: string) => {
  try {
    const Document = await DocumentModel.findOneAndUpdate(
      { _id: id },
      {
        title: input.title,
        description: input.description,
        content: input.content,
      }
    );

    logger.info(`Update document successfully`);
    return Document;
  } catch (error) {
    logger.error(`Error while update document: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const deleteDocument = async (id: string) => {
  try {
    const Document = await DocumentModel.findOneAndDelete({ _id: id });

    logger.info(`Delete document successfully`);
    return Document;
  } catch (error) {
    logger.error(`Error while create new document: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const getDocumentById = async (params: ParamsDocumentDto) => {
  try {
    const results = await DocumentModel.findOne({ _id: params.id })
      .populate('author', '-is_blocked -roles -created_at -updated_at -__v')
      .populate('subject', '-is_deleted -created_at -updated_at -__v');

    logger.info(`Get a document successfully`);
    return results;
  } catch (error) {
    logger.error(`Error while get a document: ${error}`);
    throw new HttpException(400, error, ErrorCodes.BAD_REQUEST.CODE);
  }
};
