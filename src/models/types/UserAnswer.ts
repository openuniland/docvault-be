import {Document} from 'mongoose'
import Question from './Question';
import Exam from './Exam';
import Answer from './Answer';
export default interface UserAnswer extends Document {
    question: Question;
    exam: Exam;
    answer: Answer;
    isDeleted: boolean;
}