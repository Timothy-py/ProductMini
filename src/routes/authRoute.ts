import express from 'express';
import { Request, Response } from 'express';

const authRouter = express.Router();

authRouter.get('/', (req:Request, res:Response) => {
    return res.send("")
})

module.exports = authRouter;