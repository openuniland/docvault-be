import {Document} from 'mongoose'
import Subject from './Subject';
import Answer from './Answer';

export default interface Question extends Document {
    content : string;
    image : string;
    subject : Subject;
    correct_answer : Answer;
    answers : Answer[];
    is_deleted : boolean;
    accuracy : string;
    is_essay : boolean;
    is_approved : boolean;
}