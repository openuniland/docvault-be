import { ErrorCodes, HttpException } from 'exceptions';
import DocumentModel from 'models/schema/Document';
import { logger } from 'utils/logger';

import { DocumentDto, UpdateDocumentDto } from './dto/DocumentsDto';

export const getDocuments = async () => {
  try {
    const Documents = await DocumentModel.find().populate('subject').populate('author');

    logger.info(`Get all documents successfully`);
    return Documents;
  } catch (error) {
    logger.error(`Error while get documents: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const createDocument = async (input: DocumentDto) => {
  try {
    const Document = await DocumentModel.create(input);

    logger.info(`Create new document successfully`);
    return Document;
  } catch (error) {
    logger.error(`Error while create new document: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

export const updateDocument = async (input: UpdateDocumentDto, id: string) => {
  try {
    const Document = await DocumentModel.findOneAndUpdate(
      { _id: id },
      {
        author: input.author,
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

export const getDocumentsOfUser = async (id: string) => {
  try {
    const Document = await DocumentModel.find({ author: id });

    return Document;
  } catch (error) {
    logger.error(`Error while get document of user: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};
