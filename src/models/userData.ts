import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  weekday: string;
  slotTime: string;
  userId:string
}

// User schema
const userSchema: Schema = new Schema({
  weekday: { type: String, required: false },
  slotTime: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Create and export the models
const UserslotData = mongoose.model<IUser>('slots', userSchema);
const NewUserslotData = mongoose.model<IUser>('userslots', userSchema);

export { UserslotData, NewUserslotData };
