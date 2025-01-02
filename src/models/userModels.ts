import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  mobileNumber:number;
}

//user model
const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    role:{ type: String, required: true },
  },
  {
    timestamps: true, 
  }
);

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);
export default User;
