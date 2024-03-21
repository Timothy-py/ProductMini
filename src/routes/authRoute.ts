import express from "express";

import { signup } from "../controllers/authController";

const authRouter = express.Router();

authRouter.get("/", signup);

export default authRouter;
