import { Request, Response } from 'express';
import * as service from './service';


// GET: v1/login
const login = async (req: Request, res: Response) => {
	const result = await service.login(req);
	

};

export { login };