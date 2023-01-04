import { Model, model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import UserExam from 'models/types/UserExam';

const UserExamSchema = new Schema<UserExam>(
  {
    author: { type: Schema.Types.ObjectId, ref: MODELS.user, required: true },
    exam: { type: Schema.Types.ObjectId, ref: MODELS.exam, required: true },
    duration: { type: Schema.Types.Number, required: true },
    is_deleted: { type: Boolean, default: false },
    is_complete: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

UserExamSchema.index({ author: 1, exam: 1 });
const UserExamModel: Model<UserExam> = model<UserExam>(MODELS.user_exam, UserExamSchema, MODELS.user_exam);
export default UserExamModel;
