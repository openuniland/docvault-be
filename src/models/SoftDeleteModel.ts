import mongoose from 'mongoose';

export type TWithSoftDeleted = {
  is_deleted: boolean;
  deletedAt: Date | null;
};

type TDocument = TWithSoftDeleted & mongoose.Document;

const softDeletePlugin = (schema: mongoose.Schema) => {
  schema.add({
    is_deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  });

  const typesFindQueryMiddleware = [
    'count',
    'find',
    'findOne',
    'findOneAndDelete',
    'findOneAndRemove',
    'findOneAndUpdate',
    'update',
    'updateOne',
    'updateMany',
  ];

  const setDocumentIsDeleted = async (doc: TDocument) => {
    doc.is_deleted = true;
    doc.deletedAt = new Date();
    doc.$isDeleted(true);
    await doc.save();
  };

  const excludeInFindQueriesIsDeleted = async function (this: any, next: any) {
    this.where({ is_deleted: false });
    next();
  };

  const excludeInDeletedInAggregateMiddleware = async function (this: mongoose.Aggregate<any>, next: any) {
    this.pipeline().unshift({ $match: { is_deleted: false } });
    next();
  };

  schema.pre('remove', async function (this: TDocument, next: any) {
    await setDocumentIsDeleted(this);
    next();
  });

  typesFindQueryMiddleware.forEach((type: any) => {
    schema.pre(type, excludeInFindQueriesIsDeleted);
  });

  schema.pre('aggregate', excludeInDeletedInAggregateMiddleware);
};

export { softDeletePlugin };
