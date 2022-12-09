import { Document } from 'mongoose';

import Exam from './Exam';
import User from './User';

export default interface UserExam extends Document {
  author: User;
  exam: Exam;
  is_deleted: boolean;
}
