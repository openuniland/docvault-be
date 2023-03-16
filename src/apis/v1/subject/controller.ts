import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';
import { ParamsSubjectDto, SubjectDto, UpdateSubjectDto, QuerySubjectDto } from './dto/SubjectDto';
import URLParams from 'utils/rest/urlparams';

export const getSubjects = async (req: RequestWithUser, res: Response) => {
  const urlParams: URLParams = req.searchParams;
  const input: QuerySubjectDto = req.query;
  const { result, meta } = await service.getSubjects(input, urlParams);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK', meta.total, meta.currentPage, meta.pageSize));
};

export const createSubject = async (req: RequestWithUser, res: Response) => {
  const input: SubjectDto = req.body;

  const result = await service.createSubject(input);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const updateSubject = async (req: RequestWithUser, res: Response) => {
  const params: ParamsSubjectDto = req.params;
  const input: UpdateSubjectDto = req.body;

  const result = await service.updateSubject(input, params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const deleteSubject = async (req: RequestWithUser, res: Response) => {
  const params: ParamsSubjectDto = req.params;

  const result = await service.deleteSubject(params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getSubjectById = async (req: RequestWithUser, res: Response) => {
  const params: ParamsSubjectDto = req.params;
  const result = await service.getSubjectById(params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
