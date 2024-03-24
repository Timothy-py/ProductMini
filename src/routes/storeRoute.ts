import express from "express";

import {
  createStore,
  getStoreDetails,
  getMyStores,
  editStore,
  deleteStore
} from "../controllers/storeController";
import storeOwnerGuard from "../middlewares/storeOwnerGuard";

const storeRouter = express.Router();

storeRouter.post("/", storeOwnerGuard, createStore);

storeRouter.get("/:storeId", getStoreDetails);

storeRouter.get("/", storeOwnerGuard, getMyStores);

storeRouter.patch("/:storeId", storeOwnerGuard, editStore);

storeRouter.delete("/:storeId", storeOwnerGuard, deleteStore);

export default storeRouter;
