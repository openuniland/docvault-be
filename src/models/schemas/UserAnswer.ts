import { model, Model, Schema } from 'mongoose';
import {MODELS} from 'utils/constants/models';
import UserAnswer from 'models/types/UserAnswer';

const UserAnswerSchema = new Schema<UserAnswer>(
    {
        question: {type: String, required: true, ref: MODELS.subject},
        exam: {type: String, required: true, ref: MODELS.exam},
        answer: {type: String, required: true, ref: MODELS.answer},
        isDeleted: {type: Boolean, default: false}
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
)

UserAnswerSchema.index({question: 'text',exam: 'text',answer:'text'});
const UserAnswerModel: Model<UserAnswer> = model<UserAnswer>(MODELS.user_answer, UserAnswerSchema, MODELS.user_answer);
export default UserAnswerModel;