import {Document} from 'mongoose'

export default interface Subject extends Document{
    subjectName: string;
    isDeleted: boolean;
    isApproved: boolean;
}