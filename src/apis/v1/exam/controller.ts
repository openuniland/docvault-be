import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';

import { ParamsExamDto, ExamDto, UpdateExamByOwnerDto } from './dto/ExamDto';
import { ObjectId } from 'mongoose';
import URLParams from 'utils/rest/urlparams';

export const getExams = async (req: RequestWithUser, res: Response) => {
  const urlParams: URLParams = req.searchParams;
  const { result, meta } = await service.getExams(urlParams);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK', meta.total, meta.currentPage, meta.pageSize));
};

export const getExamById = async (req: RequestWithUser, res: Response) => {
  const input: ParamsExamDto = req.params;
  const result = await service.getExamById(input.id);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getExamsBySubjectId = async (req: RequestWithUser, res: Response) => {
  const urlParams: URLParams = req.searchParams;
  const input: ParamsExamDto = req.params;
  const { result, meta } = await service.getExamsBySubjectId(input.id, urlParams);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK', meta.total, meta.currentPage, meta.pageSize));
};

export const createExam = async (req: RequestWithUser, res: Response) => {
  const input: ExamDto = req.body;
  const author: ObjectId = req?.user?._id;
  const result = await service.createExam(input, author);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateExamByOwner = async (req: RequestWithUser, res: Response) => {
  const params: ParamsExamDto = req.params;
  const input: UpdateExamByOwnerDto = req.body;
  const author: ObjectId = req?.user?._id;
  const result = await service.updateExamByOwner(params.id, author, input);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const deleteExam = async (req: RequestWithUser, res: Response) => {
  const params: ParamsExamDto = req.params;
  const result = await service.deleteExam(params.id);

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getDraftExam = async (req: RequestWithUser, res: Response) => {
  const author = req?.user?._id;
  const result = await service.getDraftExam(String(author));

  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
