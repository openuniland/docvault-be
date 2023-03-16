import { Response } from 'express';

import * as userExamService from 'apis/v1/userExam/service';
import * as documentService from 'apis/v1/documents/service';
import * as authService from 'apis/v1/auth/service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';
import {
  CreateDocumentRequestForAdmin,
  DocumentApproveRequest,
  DocumentFilter,
  ParamsDocumentDto,
} from '../documents/dto/DocumentsDto';
import { LoginDto } from '../auth/dto/LoginDto';
import { ObjectId } from 'mongoose';
import URLParams from 'utils/rest/urlparams';

export const getAllUserExams = async (req: RequestWithUser, res: Response) => {
  const urlParams: URLParams = req.searchParams;
  const result = await userExamService.getAllUserExams(urlParams);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getDocumentsByAdmin = async (req: RequestWithUser, res: Response) => {
  const query: DocumentFilter = req.query;
  const urlParams: URLParams = req.searchParams;
  const result = await documentService.getDocumentsByAdmin(query, urlParams);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const adminLogin = async (req: RequestWithUser, res: Response) => {
  const input = req.headers['google-token'];
  const checker = Array.isArray(input);
  const token: LoginDto = checker ? { googleToken: input[0] } : { googleToken: input };

  const result = await authService.adminLogin(token);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const approveTheDocumentByAdmin = async (req: RequestWithUser, res: Response) => {
  const body: DocumentApproveRequest = req.body;
  const params: ParamsDocumentDto = req.params;

  const result = await documentService.approveTheDocument(body, params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const createNewDocumentByAdmin = async (req: RequestWithUser, res: Response) => {
  const body: CreateDocumentRequestForAdmin = req.body;
  const author: ObjectId = req?.user?._id;

  const result = await documentService.createDocumentByAdmin(body, author);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
