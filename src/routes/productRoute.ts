import express from "express";
import storeOwnerGuard from "../middlewares/storeOwnerGuard";
import { addProduct,getProductDetails } from "../controllers/productController";
import imageUpload from "../middlewares/imageUpload";

const productRouter = express.Router();

productRouter.post(
  "/add/:storeId",
  storeOwnerGuard,
  imageUpload.single("image"),
  addProduct
);

productRouter.get('/:productId', getProductDetails)

export default productRouter;
