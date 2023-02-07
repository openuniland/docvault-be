import { Document } from 'mongoose';

import Question from './Question';
import Subject from './Subject';
import User from './User';
export default interface Exam extends Document {
  author: User;
  semester: string;
  questions: Question[];
  subject: Subject;
  is_deleted: boolean;
  is_approved: boolean;
}
