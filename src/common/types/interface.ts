import { Types } from "mongoose";

export interface IUser {
  _authId: Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  getSignedJWTToken: Function
}

export interface IAuth {
  email: string;
  password: string;
  matchPassword: Function
}
