import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import Subject from 'models/types/Subject';
import { softDeletePlugin } from 'models/SoftDeleteModel';

const SubjectSchema = new Schema<Subject>(
  {
    subject_name: { type: String, required: true, unique: true },
    is_deleted: { type: Boolean, default: false },
    is_approved: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

SubjectSchema.plugin(softDeletePlugin);

SubjectSchema.index({ subject_name: 1 });
const SubjectModel: Model<Subject> = model<Subject>(MODELS.subject, SubjectSchema, MODELS.subject);
export default SubjectModel;
