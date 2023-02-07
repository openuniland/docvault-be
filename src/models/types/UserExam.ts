import { Document } from 'mongoose';

import Question from './Question';
import Subject from './Subject';
import User from './User';
import UserAnswer from './UserAnswer';

export default interface UserExam extends Document {
  author: User;
  semester_of_exam: string;
  questions: Question;
  subject: Subject;
  is_deleted: boolean;
  score: number;
  user_answer_id: UserAnswer;
  duration: number;
  is_completed: boolean;
}
