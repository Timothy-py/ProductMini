import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IAuth } from "../common/types/interface";

const authSchema = new mongoose.Schema<IAuth>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

authSchema.set("timestamps", true);

// Encrypt password
authSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

// Match user entered password to hashed password in database
authSchema.methods.matchPassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Auth = mongoose.model<IAuth>("auth", authSchema);

export default Auth;
