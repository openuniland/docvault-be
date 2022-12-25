import { Document } from 'mongoose';

import { Content } from 'utils/types';
import Subject from './Subject';

export default interface Documents extends Document {
  author: string;
  title: string;
  description: string;
  subject: Subject;
  is_approved: boolean;
  is_deleted: boolean;
  content: Content[];
}
