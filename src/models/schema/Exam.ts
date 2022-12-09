import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import Exam from 'models/types/Exam';

const ExamSchema = new Schema<Exam>(
  {
    author: { type: String, required: true },
    question: { type: Schema.Types.ObjectId, required: true, ref: MODELS.question },
    subject: { type: Schema.Types.ObjectId, required: true, ref: MODELS.subject },
    is_deleted: { type: Boolean },
    is_approved: { type: Boolean },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);
ExamSchema.index({ author: 1 });
const ExamModel: Model<Exam> = model<Exam>(MODELS.exam, ExamSchema, MODELS.exam);
export default ExamModel;
