import { Response } from 'express';

import * as userExamService from 'apis/v1/userExam/service';
import fmt from 'utils/formatter';
import RequestWithUser from 'utils/rest/request';

export const getAllUserExams = async (req: RequestWithUser, res: Response) => {
  const result = await userExamService.getAllUserExams();
  res.send(fmt.formatResponse(result, Date.now() - req.startTime, 'OK'));
};
