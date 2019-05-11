import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  contactMobile: {
    type: Number,
  },
}, {
  timestamps: true,
});

userSchema.statics.findBySlug = function (slug, cb) {
  return this.findOne({ slug }, cb);
};

const User = mongoose.model('User', userSchema);

export default User;
