import { Model, model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import UserAnswer, { AnswerInterface } from 'models/types/UserAnswer';

const UserAnswerSchema = new Schema<UserAnswer>(
  {
    answers: Array<AnswerInterface>,
    user_exam: { type: Schema.Types.ObjectId, ref: MODELS.user_exam, required: true },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

UserAnswerSchema.index({ fullname: 1, email: 1 });
const UserAnswerModel: Model<UserAnswer> = model<UserAnswer>(MODELS.user_answer, UserAnswerSchema, MODELS.user_answer);
export default UserAnswerModel;
