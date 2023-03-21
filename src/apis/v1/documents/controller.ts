import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';

import { DocumentDto, UpdateDocumentByOwnerDto, ParamsDocumentDto } from './dto/DocumentsDto';
import { ObjectId } from 'mongoose';
import URLParams from 'utils/rest/urlparams';

export const getDocuments = async (req: RequestWithUser, res: Response) => {
  const urlParams: URLParams = req.searchParams;
  const { result, meta } = await service.getDocuments(urlParams);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK', meta.total, meta.currentPage, meta.pageSize));
};

export const createDocument = async (req: RequestWithUser, res: Response) => {
  const input: DocumentDto = req.body;
  const author: ObjectId = req?.user?._id;

  const result = await service.createDocument(input, author);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateDocumentByOwner = async (req: RequestWithUser, res: Response) => {
  const params: ParamsDocumentDto = req.params;
  const input: UpdateDocumentByOwnerDto = req.body;
  const author: ObjectId = req?.user?._id;
  const result = await service.updateDocumentByOwner(input, params.id, author);

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

export const getDocumentsBySubjectId = async (req: RequestWithUser, res: Response) => {
  const input: ParamsDocumentDto = req.params;
  const result = await service.getDocumentsBySubjectId(input.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
