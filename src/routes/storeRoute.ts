import express from "express";

import { createStore } from "../controllers/storeController";
import storeOwnerGuard from "../middlewares/storeOwnerGuard";

const storeRouter = express.Router();

storeRouter.post("/", storeOwnerGuard, createStore);

export default storeRouter;
