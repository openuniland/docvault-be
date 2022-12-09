import { Document } from 'mongoose';

import Question from './Question';
import Subject from './Subject';
export default interface Exam extends Document {
  author: string;
  question: Question;
  subject: Subject;
  is_deleted: boolean;
  is_approved: boolean;
}
