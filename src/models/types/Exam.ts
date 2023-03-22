import { Document } from 'mongoose';

import Subject from './Subject';
import User from './User';
export default interface Exam extends Document {
  author: User;
  subject: Subject;
  title: string;
  description: string;
  semester: number;
  school_year: string;
  is_deleted: boolean;
  is_approved: boolean;
  is_draft: boolean;
}
