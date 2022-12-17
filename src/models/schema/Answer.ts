import { model, Model, Schema } from 'mongoose';
import { MODELS } from 'utils/constants/models';
import Answer from 'models/types/Answer';

const AnswerSchema = new Schema<Answer>(
  {
    content: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
    status: { type: Boolean },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);
AnswerSchema.index({ content: 1 });
const AnswerModel: Model<Answer> = model<Answer>(MODELS.answer, AnswerSchema, MODELS.answer);
export default AnswerModel;
