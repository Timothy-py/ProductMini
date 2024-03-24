import express from "express";

import {
  createStore,
  getStoreDetails,
  getMyStores,
} from "../controllers/storeController";
import storeOwnerGuard from "../middlewares/storeOwnerGuard";

const storeRouter = express.Router();

storeRouter.post("/", storeOwnerGuard, createStore);

storeRouter.get("/:storeId", getStoreDetails);

storeRouter.get("/", storeOwnerGuard, getMyStores);

export default storeRouter;
