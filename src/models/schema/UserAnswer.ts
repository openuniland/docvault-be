import { Model, model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import UserAnswer from 'models/types/UserAnswer';

const UserAnswerSchema = new Schema<UserAnswer>(
  {
    answers_id: [{ type: Schema.Types.String }],
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const UserAnswerModel: Model<UserAnswer> = model<UserAnswer>(MODELS.user_answer, UserAnswerSchema, MODELS.user_answer);
export default UserAnswerModel;
