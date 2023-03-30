import { Document } from 'mongoose';

import { Content } from 'utils/types';
import Subject from './Subject';
import User from './User';

export default interface DocumentType extends Document {
  author: User;
  title: string;
  description: string;
  subject: Subject;
  semester: number;
  school_year: string;
  is_approved: boolean;
  is_deleted: boolean;
  content: Content[];
}
