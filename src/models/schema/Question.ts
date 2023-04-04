import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import Question from 'models/types/Question';
import { softDeletePlugin } from 'models/SoftDeleteModel';
import AnswerSchema from './Answer';

const QuestionSchema = new Schema<Question>(
  {
    author: { type: Schema.Types.ObjectId, ref: MODELS.user, required: true },
    exam_id: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    image: { type: String },
    correct_answer: { type: AnswerSchema },
    answers: [AnswerSchema],
    is_deleted: { type: Boolean, default: false },
    accuracy: { type: String, enum: ['high', 'medium', 'low'] },
    is_essay: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

QuestionSchema.plugin(softDeletePlugin);

QuestionSchema.index({ content: 1 });
const QuestionModel: Model<Question> = model<Question>(MODELS.question, QuestionSchema, MODELS.question);
export default QuestionModel;
