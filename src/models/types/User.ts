import {Document} from 'mongoose';

export default interface User extends Document {
    fullname: string;
    email: string;
    isBlocked: boolean;
    enum: string;
}