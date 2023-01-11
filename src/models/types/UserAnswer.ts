import { Document, ObjectId } from 'mongoose';

import Answer from './Answer';
import UserExam from './UserExam';
export default interface UserAnswer extends Document {
  answers: Answer;
  user_exam: UserExam;
  is_deleted: boolean;
}

export interface AnswerInterface extends Document {
  content: string;
  answer_id: ObjectId;
}
