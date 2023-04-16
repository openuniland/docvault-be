import { ObjectId } from 'mongoose';

export default interface JWTPayload {
  role: string;
  name: string;
  email: string;
  avatar: string;
  is_blocked: boolean;
  _id: ObjectId;
  rank?: string;
}

export interface Content {
  name: string;
  image?: string;
  file?: string;
  description?: string;
}
