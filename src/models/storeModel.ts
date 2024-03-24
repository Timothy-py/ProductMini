import mongoose from "mongoose";
import { IStore } from "../common/types/interface";

const storeSchema = new mongoose.Schema<IStore>({
  _authId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "a store can not be created without an auth ID"],
    ref: "auth",
  },
  name: {
    type: String,
    required: true,
  },
  one_line_pitch: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  other_details: {
    type: String,
    required: false,
  },
});

// TODO: include total products in a store field

storeSchema.set("timestamps", true);

// Compound index on authId and name: a store owner cannot have multiple stores with same name
storeSchema.index({ _authId: 1, name: 1 }, { unique: true });

const Store = mongoose.model<IStore>("store", storeSchema);

export default Store;
