import { Document } from 'mongoose';

export default interface UserAnswer extends Document {
  answers_id: string[];
  is_deleted: boolean;
}
