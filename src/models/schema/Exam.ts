import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import Exam from 'models/types/Exam';
import { softDeletePlugin } from 'models/SoftDeleteModel';

const ExamSchema = new Schema<Exam>(
  {
    author: { type: Schema.Types.ObjectId, ref: MODELS.user, required: true },
    subject: { type: Schema.Types.ObjectId, ref: MODELS.subject },
    title: { type: String },
    description: { type: String },
    semester: { type: Number },
    school_year: { type: String },
    is_deleted: { type: Boolean, default: false },
    is_approved: { type: Boolean, default: false },
    is_draft: { type: Boolean, default: true },
    rank: { type: String, default: 'NOVICE' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

ExamSchema.plugin(softDeletePlugin);

ExamSchema.index({ author: 1 });
const ExamModel: Model<Exam> = model<Exam>(MODELS.exam, ExamSchema, MODELS.exam);
export default ExamModel;
