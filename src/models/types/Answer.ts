import Document from 'mongoose';
export default interface Answer extends Document {
  id: string;
  content: string;
  status: boolean;
}
