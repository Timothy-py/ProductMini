import express from "express";

import { signup } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/signup", signup);

export default authRouter;
