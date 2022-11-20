import {Document} from 'mongoose'
import Subject from './Subject';

export default interface Documents extends Document {
    title : string;
    description : string;
    subject : Subject;
    status : boolean;
    is_deleted : boolean;
    content : Object;
}