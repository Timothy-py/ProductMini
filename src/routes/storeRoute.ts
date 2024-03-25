import express from "express";

import {
  createStore,
  getStoreDetails,
  getMyStores,
  editStore,
  deleteStore,
  getAllProducts
} from "../controllers/storeController";
import storeOwnerGuard from "../middlewares/storeOwnerGuard";

const storeRouter = express.Router();

// CREATE A STORE
storeRouter.post("/", storeOwnerGuard, createStore);

// GET A STORE DETAILS
storeRouter.get("/:storeId", getStoreDetails);

// GET ALL STORES OF A STORE OWNER
storeRouter.get("/", storeOwnerGuard, getMyStores);

// UPDATE A STORE DETAILS
storeRouter.patch("/:storeId", storeOwnerGuard, editStore);

// DELETE A STORE
storeRouter.delete("/:storeId", storeOwnerGuard, deleteStore);

// GET ALL PRODUCTS IN A STORE
storeRouter.get("/:storeId/products", getAllProducts)

export default storeRouter;
