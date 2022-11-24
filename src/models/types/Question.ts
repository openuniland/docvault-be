import { Document } from 'mongoose';
import Subject from './Subject';
import Answer from './Answer';

enum Accuracy {
  Absolute,
  Relatively,
}
export default interface Question extends Document {
  content: string;
  image: string;
  subject: Subject;
  correctAnswer: Answer;
  answers: Answer[];
  isDeleted: boolean;
  accuracy: Accuracy;
  isEssay: boolean;
  isApproved: boolean;
}
