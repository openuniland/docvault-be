import mongoose from 'mongoose';

export type TWithSoftDeleted = {
  is_deleted: boolean;
  deleted_at: Date | null;
};

export type TDocument = TWithSoftDeleted & mongoose.Document;

const softDeletePlugin = (schema: mongoose.Schema) => {
  schema.add({
    is_deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  });

  const typesFindQueryMiddleware = [
    'count',
    'countDocuments',
    'findById',
    'findByIdAndUpdate',
    'find',
    'findOne',
    'findOneAndDelete',
    'findOneAndRemove',
    'findOneAndUpdate',
    'update',
    'updateOne',
    'updateMany',
  ];

  const excludeInFindQueriesIsDeleted = async function (this: any, next: any) {
    this.where({ is_deleted: false });
    next();
  };

  const excludeInDeletedInAggregateMiddleware = async function (this: mongoose.Aggregate<any>, next: any) {
    this.pipeline().unshift({ $match: { is_deleted: false } });
    next();
  };

  typesFindQueryMiddleware.forEach((type: any) => {
    schema.pre(type, excludeInFindQueriesIsDeleted);
  });

  schema.pre('aggregate', excludeInDeletedInAggregateMiddleware);
};

export { softDeletePlugin };
