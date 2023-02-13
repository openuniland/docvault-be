import { Document } from 'mongoose';

import Question from './Question';
import Subject from './Subject';
import User from './User';
export default interface Exam extends Document {
  author: User;
  questions: Question[];
  subject: Subject;
  title: string;
  semester: number;
  school_year: string;
  is_deleted: boolean;
  is_approved: boolean;
}
