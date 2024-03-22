import { Types } from "mongoose";

export interface IUser {
  _authId: Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
}

export interface IAuth {
  email: string;
  password: string;
}
