import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';

import { DocumentDto, UpdateDocumentDto, ParamsDocumentDto } from './dto/DocumentsDto';

export const getDocument = async (req: RequestWithUser, res: Response) => {
  const result = await service.getDocuments();
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const createDocument = async (req: RequestWithUser, res: Response) => {
  const input: DocumentDto = req.body;
  const result = await service.createDocument(input);

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

export const getDocumentsOfUser = async (req: RequestWithUser, res: Response) => {
  const params: ParamsDocumentDto = req.params;
  const result = await service.getDocumentsOfUser(params.id);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
