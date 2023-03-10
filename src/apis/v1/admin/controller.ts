import { Response } from 'express';

import * as userExamService from 'apis/v1/userExam/service';
import * as documentService from 'apis/v1/documents/service';
import * as authService from 'apis/v1/auth/service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';
import { DocumentFilter } from '../documents/dto/DocumentsDto';
import { LoginDto } from '../auth/dto/LoginDto';

export const getAllUserExams = async (req: RequestWithUser, res: Response) => {
  const result = await userExamService.getAllUserExams();
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getDocumentsByAdmin = async (req: RequestWithUser, res: Response) => {
  const query: DocumentFilter = req.query;
  const result = await documentService.getDocumentsByAdmin(query);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const adminLogin = async (req: RequestWithUser, res: Response) => {
  const input = req.headers['google-token'];
  const checker = Array.isArray(input);
  const token: LoginDto = checker ? { googleToken: input[0] } : { googleToken: input };

  const result = await authService.adminLogin(token);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
