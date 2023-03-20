import { Model, model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import UserExam from 'models/types/UserExam';
import { softDeletePlugin } from 'models/SoftDeleteModel';

const UserExamSchema = new Schema<UserExam>(
  {
    author: { type: Schema.Types.ObjectId, ref: MODELS.user, required: true },
    original_exam: { type: Schema.Types.ObjectId },
    questions: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: MODELS.question,
      },
    ],
    subject: { type: Schema.Types.ObjectId, required: true, ref: MODELS.subject },
    title: { type: String, required: true },
    user_answer_id: { type: Schema.Types.ObjectId, ref: MODELS.user_answer, required: true },
    duration: { type: Schema.Types.Number, required: true },
    score: { type: Schema.Types.Number, default: 0 },
    semester: { type: Number, required: true },
    school_year: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
    is_completed: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

UserExamSchema.plugin(softDeletePlugin);

UserExamSchema.index({ author: 1 });
const UserExamModel: Model<UserExam> = model<UserExam>(MODELS.user_exam, UserExamSchema, MODELS.user_exam);
export default UserExamModel;
