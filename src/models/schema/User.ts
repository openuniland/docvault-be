import { Model, model, Schema } from 'mongoose';
import { MODELS } from 'utils/constants/models';

import User from 'models/types/User';
import { ROLES } from 'utils/constants';
import { softDeletePlugin } from 'models/SoftDeleteModel';

const UserSchema = new Schema<User>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    nickname: { type: String },
    is_blocked: { type: Boolean, default: false },
    is_show_info: { type: Boolean, default: true },
    roles: { type: String, default: ROLES.USER.name },
    rank: { type: String, default: 'NOVICE' },
    dedication_score: { type: Number, default: 0 },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

UserSchema.plugin(softDeletePlugin);

UserSchema.index({ fullname: 1, email: 1 });
const UserModel: Model<User> = model<User>(MODELS.user, UserSchema, MODELS.user);
export default UserModel;
