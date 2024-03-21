import { Request, Response } from "express";

export const signup = async (req: Request, res: Response): Promise<any> => {
  return res.send("Helly");
};
