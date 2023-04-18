import { Document } from 'mongoose';

export default interface User extends Document {
  fullname: string;
  email: string;
  avatar?: string;
  is_blocked: boolean;
  roles: string;
  is_show_info: boolean;
  nickname: string;
  rank: string;
  dedication_score: number;
}
