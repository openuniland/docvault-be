import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import DocumentType from 'models/types/Document';
import { Content } from 'utils/types';
import { softDeletePlugin } from 'models/SoftDeleteModel';

const DocumentSchema = new Schema<DocumentType>(
  {
    author: { type: Schema.Types.ObjectId, ref: MODELS.user, required: true },
    title: { type: String, required: true },
    description: { type: String },
    subject: { type: Schema.Types.ObjectId, required: true, ref: MODELS.subject },
    semester: { type: Number, required: true },
    school_year: { type: String, required: true },
    is_approved: { type: Boolean, required: true, default: false },
    is_deleted: { type: Boolean, default: false },
    content: Array<Content>,
    rank: { type: String, default: 'NOVICE' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

DocumentSchema.plugin(softDeletePlugin);

DocumentSchema.index({ title: 1, description: 1 });

const DocumentModel: Model<DocumentType> = model<DocumentType>(MODELS.document, DocumentSchema, MODELS.document);
export default DocumentModel;
