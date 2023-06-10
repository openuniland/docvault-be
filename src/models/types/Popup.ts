import { Document } from 'mongoose';

export interface PopupContent {
  title: string;
  image?: string;
  video?: string;
  file?: string;
  content: string;
}

export default interface Popup extends Document {
  start_date: Date;
  end_date: Date;
  priority: number;
  title: string;
  description: string;
  cover_image: string;
  is_revoked: boolean;
  contents: PopupContent[];
  is_target_all: boolean;
  target_user: string[];
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
