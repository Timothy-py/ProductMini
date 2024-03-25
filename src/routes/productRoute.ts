import express from "express";
import storeOwnerGuard from "../middlewares/storeOwnerGuard";
import {
  addProduct,
  getProductDetails,
  editProduct,
  deleteProduct
} from "../controllers/productController";
import imageUpload from "../middlewares/imageUpload";

const productRouter = express.Router();

// ADD PRODUCT TO A STORE
productRouter.post(
  "/add/:storeId",
  storeOwnerGuard,
  imageUpload.single("image"),
  addProduct
);

// GET A PRODUCT DETAILS
productRouter.get("/:productId", getProductDetails);

// EDIT A PRODUCT DETAILS
productRouter.patch(
  "/:productId",
  storeOwnerGuard,
  imageUpload.single("image"),
  editProduct
);

// DELETE A PRODUCT
productRouter.delete("/:productId", storeOwnerGuard, deleteProduct);

export default productRouter;
