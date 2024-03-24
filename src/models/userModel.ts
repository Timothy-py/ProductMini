import mongoose from "mongoose";
import jwt from "jsonwebtoken";
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
  role: {
    type: String,
    required: true,
    enum: UserRole,
  },
});

userSchema.set("timestamps", true);

// Sign JWT
userSchema.methods.getSignedJWTToken = function () {
  return jwt.sign(
    { authId: this._authId, role: this.role },
    process.env.JWT_SECRET_KEY
  );
};

const User = mongoose.model<IUser>("user", userSchema);

export default User;
