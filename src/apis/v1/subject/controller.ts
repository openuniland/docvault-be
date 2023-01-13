import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';
import { ParamsSubjectDto, SubjectDto, UpdateSubjectDto } from './dto/SubjectDto';

export const getSubjects = async (req: RequestWithUser, res: Response) => {
  const result = await service.getSubjects();
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getSubjectsIsApprovedFalse = async (req: RequestWithUser, res: Response) => {
  const result = await service.getSubjectsIsApprovedFalse();
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
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
