import {Document} from 'mongoose'

export default interface Subject extends Document { 
    subject_name : string;
    functions : Array<string>;
    is_deleted : boolean;
    is_approved : boolean;
}