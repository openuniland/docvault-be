import { Response } from 'express';

import * as userExamService from 'apis/v1/userExam/service';
import * as documentService from 'apis/v1/documents/service';
import * as authService from 'apis/v1/auth/service';
import * as examService from 'apis/v1/exam/service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';
import {
  CreateDocumentRequestForAdmin,
  DocumentFilter,
  ParamsDocumentDto,
  UpdateDocumentByAdminDto,
} from '../documents/dto/DocumentsDto';
import { LoginDto } from '../auth/dto/LoginDto';
import { ObjectId } from 'mongoose';
import URLParams from 'utils/rest/urlparams';
import { ParamsExamDto, UpdateExamByAdminDto } from '../exam/dto/ExamDto';

export const getAllUserExams = async (req: RequestWithUser, res: Response) => {
  const urlParams: URLParams = req.searchParams;
  const { result, meta } = await userExamService.getAllUserExams(urlParams);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK', meta.total, meta.currentPage, meta.pageSize));
};

export const getDocumentsByAdmin = async (req: RequestWithUser, res: Response) => {
  const query: DocumentFilter = req.query;
  const urlParams: URLParams = req.searchParams;
  const { result, meta } = await documentService.getDocumentsByAdmin(query, urlParams);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK', meta.total, meta.currentPage, meta.pageSize));
};

export const adminLogin = async (req: RequestWithUser, res: Response) => {
  const input = req.headers['google-token'];
  const checker = Array.isArray(input);
  const token: LoginDto = checker ? { googleToken: input[0] } : { googleToken: input };

  const result = await authService.adminLogin(token);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateDocumentByAdmin = async (req: RequestWithUser, res: Response) => {
  const body: UpdateDocumentByAdminDto = req.body;
  const params: ParamsDocumentDto = req.params;

  const result = await documentService.updateDocumentByAdmin(body, params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const createNewDocumentByAdmin = async (req: RequestWithUser, res: Response) => {
  const body: CreateDocumentRequestForAdmin = req.body;
  const author: ObjectId = req?.user?._id;

  const result = await documentService.createDocumentByAdmin(body, author);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateExamByAdmin = async (req: RequestWithUser, res: Response) => {
  const body: UpdateExamByAdminDto = req.body;
  const params: ParamsExamDto = req.params;

  const result = await examService.updateExamByAdmin(params.id, body);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
