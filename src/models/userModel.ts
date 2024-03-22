import mongoose from "mongoose";
import { UserRole } from "../common/constants/enum";
import { IUser } from "../common/types/interface";

const userSchema = new mongoose.Schema<IUser>({
  _authId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "a user can not be created without an authentication ID"],
    ref: "auth",
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: UserRole,
  },
});

userSchema.set("timestamps", true);

const User = mongoose.model<IUser>("auth", userSchema);

export default User;