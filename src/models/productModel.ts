import mongoose from "mongoose";
import { IProduct } from "../common/types/interface";
import { ProductStatus } from "../common/constants/enum";

const productSchema = new mongoose.Schema<IProduct>({
  _storeId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "a product can not be created without a store ID"],
    ref: "store",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: false,
    enum: ProductStatus,
    default: "IN_STOCK"
  },
  other_details: {
    type: String,
    required: false,
  },
});

productSchema.set("timestamps", true);

// Index for faster query
productSchema.index({ _storeId: 1 });
productSchema.index({ name: 1 });

const Product = mongoose.model<IProduct>("product", productSchema);

export default Product;
