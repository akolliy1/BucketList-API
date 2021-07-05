import mongoose from 'mongoose';

const { Schema } = mongoose;

export const bucketItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  bucketListId: {
    type: Schema.Types.ObjectId,
    ref: 'BucketList',
  },
  date_created: {
    type: Date,
    default: Date.now(),
  },
  date_modified: {
    type: Date,
    default: Date.now,
  },
});

const BucketItem = mongoose.model('BucketItem', bucketItemSchema);

export default BucketItem;
