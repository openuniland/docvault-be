import { Request } from 'express';
import JWTPayload from 'utils/types';
import URLParams from './urlparams';

/**
 * Interface to add extra modifiers to request.
 */
export default interface RequestWithUser extends Request {
  // To use userId and role, please inject the same in a middleware, by decoding an access token.
  user: JWTPayload;
  customerId: number;
  customerToken: string;
  role: string;
  startTime?: number;
  userAgent?: { [key: string]: any };
  searchParams?: URLParams; // TODO: perhaps change to Dto and add validation,
  appName: string;
  params: {
    id: string;
  };
  query: {
    subject_name: string;
  };
}
