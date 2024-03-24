import express from "express";

import { signup, signin } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/signin", signin);

export default authRouter;
