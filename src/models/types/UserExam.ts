import { Document } from 'mongoose';
import Exam from './Exam';

import Question from './Question';
import Subject from './Subject';
import User from './User';
import UserAnswer from './UserAnswer';

export default interface UserExam extends Document {
  author: User;
  original_exam: Exam;
  questions: Question;
  subject: Subject;
  is_deleted: boolean;
  score: number;
  user_answer_id: UserAnswer;
  duration: number;
  semester: string;
  is_completed: boolean;
}
