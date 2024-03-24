import express from "express";

import { createStore, getStoreDetails } from "../controllers/storeController";
import storeOwnerGuard from "../middlewares/storeOwnerGuard";

const storeRouter = express.Router();

storeRouter.post("/", storeOwnerGuard, createStore);

storeRouter.get("/:storeId", getStoreDetails)

// storeRouter.get("/", getMyStores)

export default storeRouter;
