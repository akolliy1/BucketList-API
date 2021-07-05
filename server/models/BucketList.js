import mongoose from 'mongoose';

const { Schema } = mongoose;

const bucketListSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  items: [{
    type: Schema.Types.ObjectId, ref: 'BucketItem',
  }],
  created_by: {
    type: String,
    required: true,
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

const BucketList = mongoose.model('BucketList', bucketListSchema);

export default BucketList;
