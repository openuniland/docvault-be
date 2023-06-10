import { Model, model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import { softDeletePlugin } from 'models/SoftDeleteModel';
import Popup, { PopupContent } from 'models/types/Popup';

const PopupSchema = new Schema<Popup>(
  {
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    priority: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    cover_image: { type: String },
    is_revoked: { type: Boolean, default: false },
    contents: Array<PopupContent>,
    is_target_all: { type: Boolean, default: false },
    target_user: Array<string>,
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

PopupSchema.plugin(softDeletePlugin);

PopupSchema.index({ priority: 1, is_revoked: 1 });

const PopupModel: Model<Popup> = model<Popup>(MODELS.popup, PopupSchema, MODELS.popup);
export default PopupModel;
