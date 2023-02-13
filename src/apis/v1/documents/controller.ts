import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';

import { DocumentDto, UpdateDocumentDto, ParamsDocumentDto } from './dto/DocumentsDto';
import { ObjectId } from 'mongoose';

export const getDocuments = async (req: RequestWithUser, res: Response) => {
  const result = await service.getDocuments();
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const createDocument = async (req: RequestWithUser, res: Response) => {
  const input: DocumentDto = req.body;
  const author: ObjectId = req?.user?._id;

  const result = await service.createDocument(input, author);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateDocument = async (req: RequestWithUser, res: Response) => {
  const params: ParamsDocumentDto = req.params;
  const input: UpdateDocumentDto = req.body;
  const result = await service.updateDocument(input, params.id);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const deleteDocument = async (req: RequestWithUser, res: Response) => {
  const params: ParamsDocumentDto = req.params;
  const result = await service.deleteDocument(params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getDocumentById = async (req: RequestWithUser, res: Response) => {
  const params: ParamsDocumentDto = req.params;
  const result = await service.getDocumentById(params);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
