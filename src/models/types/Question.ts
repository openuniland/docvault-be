import { Document, ObjectId } from 'mongoose';

import Answer from './Answer';
import User from './User';

export default interface Question extends Document {
  author: User;
  exam_id: ObjectId;
  content: string;
  image: string;
  correct_answer: Answer;
  answers: Answer[];
  is_deleted: boolean;
  accuracy: string;
  is_essay: boolean;
}
