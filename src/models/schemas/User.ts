import { model, Model, Schema } from 'mongoose';

import {MODELS} from 'utils/constants/models';

import User from 'models/types/User';

enum Roles{
    ADMIN,
    APPROVER,
    USER
}
const UserSchema = new Schema<User>(
    {
        fullname: { type: String, required: true},
        email: {type: String, required: true, unique: true},
        isBlocked: {type: Boolean, default: false},
        roles: {enum: Roles}
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
)
UserSchema.index({fullname:'text',email:'text'});
const UserModel: Model<User> = model<User>(MODELS.user, UserSchema, MODELS.user);
export default UserModel;