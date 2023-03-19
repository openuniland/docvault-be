import { Document } from 'mongoose';

export default interface User extends Document {
  fullname: string;
  email: string;
  avatar?: string;
  is_blocked: boolean;
  roles: string;
  is_deleted?: boolean;
}
