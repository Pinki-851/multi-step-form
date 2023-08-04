import mongoose from 'mongoose';

const personalDetailsSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  mobile: { type: String },
});

// Define the main schema
const signUpSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});
const UserSchema = new mongoose.Schema(
  {
    signUpDetails: signUpSchema,
    personalDetails: personalDetailsSchema,
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
