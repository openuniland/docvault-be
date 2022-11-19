import {Document} from 'mongoose'

export default interface Answer extends Document {
    content : string;
    is_deleted : boolean;
    status : boolean;
}