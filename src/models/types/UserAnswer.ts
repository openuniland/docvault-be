import { Document } from 'mongoose';

import Question from './Question';
import Answer from './Answer';
import UserExam from './UserExam';
export default interface UserAnswer extends Document {
  question: Question;
  answer: Answer;
  user_exam: UserExam;
  is_deleted: boolean;
}
