import { Schema } from 'mongoose';
import Answer from 'models/types/Answer';

const AnswerSchema = new Schema<Answer>(
  {
    id: { type: String },
    content: { type: String, required: true },
    status: { type: Boolean },
  },
  { _id: false }
);

export default AnswerSchema;
