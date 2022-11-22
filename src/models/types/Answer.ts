import {Document} from 'mongoose'

export default interface Answer extends Document {
    content: string;
    isDeleted: boolean;
    status: boolean;
}