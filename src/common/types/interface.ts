import { Types } from "mongoose";

export interface IUser {
  _authId: Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  getSignedJWTToken: Function;
}

export interface IAuth {
  email: string;
  password: string;
  matchPassword: Function;
}

export interface IStore {
  _authId: Types.ObjectId;
  name: string;
  one_line_pitch: string;
  country: string;
  state: string;
  address: string;
  other_details?: string;
}

export interface IProduct {
  _storeId: Types.ObjectId;
  name: string;
  imageUrl: string;
  description?: string;
  price: number;
  units: number;
  status?: string;
  other_details?: string;
}
