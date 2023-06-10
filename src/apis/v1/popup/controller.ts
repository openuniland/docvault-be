import { Response } from 'express';

import * as service from './service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';
// import URLParams from 'utils/rest/urlparams';
import { DocumentDto, ParamsPopupDto } from './dto/CreatePopupDto';

export const createPopup = async (req: RequestWithUser, res: Response) => {
  const input: DocumentDto = req.body;
  const result = await service.createPopup(input);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const deletePopup = async (req: RequestWithUser, res: Response) => {
  const params: ParamsPopupDto = req.params;

  const result = await service.deletePopup(params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const revokedPopup = async (req: RequestWithUser, res: Response) => {
  const params: ParamsPopupDto = req.params;

  const result = await service.revokedPopup(params.id);
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getPopups = async (req: RequestWithUser, res: Response) => {
  const result = await service.getPopups();
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};

export const getPopupsByDateRange = async (req: RequestWithUser, res: Response) => {
  const result = await service.getPopupsByDateRange();
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
