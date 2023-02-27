import { Document } from 'mongoose';
import Exam from './Exam';

import Question from './Question';
import Subject from './Subject';
import User from './User';
import UserAnswer from './UserAnswer';

export default interface UserExam extends Document {
  author: User;
  original_exam: Exam;
  title: string;
  questions: Question[];
  subject: Subject;
  is_deleted: boolean;
  score: number;
  user_answer_id: UserAnswer;
  duration: number;
  semester: number;
  school_year: string;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
}
