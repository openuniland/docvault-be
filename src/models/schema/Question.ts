import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import Question from 'models/types/Question';
import { softDeletePlugin } from 'models/SoftDeleteModel';

const QuestionSchema = new Schema<Question>(
  {
    content: { type: String, required: true, unique: true },
    image: { type: String },
    subject: { type: Schema.Types.ObjectId, required: true, ref: MODELS.subject },
    correct_answer: { type: Schema.Types.ObjectId, required: true, ref: MODELS.answer },
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: MODELS.answer,
      },
    ],
    is_deleted: { type: Boolean, default: false },
    accuracy: { type: String, enum: ['high', 'medium', 'low'] },
    is_essay: { type: Boolean, default: false },
    is_approved: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

QuestionSchema.plugin(softDeletePlugin);

QuestionSchema.index({ content: 1, subject: 1 });
const QuestionModel: Model<Question> = model<Question>(MODELS.question, QuestionSchema, MODELS.question);
export default QuestionModel;
