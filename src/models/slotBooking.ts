import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  weekday: string;
  slotTime: string;
}

//user model
const userSchema: Schema = new Schema(
  {
    weekday: { type: String, required: true },
    slotTime: { type: String, required: true},
  },
  {
    timestamps: true, 
  }
);

// Create and export the User model
const Slot = mongoose.model<IUser>('Slot', userSchema);
export default Slot;
