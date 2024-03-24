import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../common/constants/enum";
import User from "../models/userModel";

// Store Owner authorizatin guard
const storeOwnerGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // set token from header
    token = req.headers.authorization.split(" ")[1];
  } else if (req.headers.cookie && req.headers.cookie.startsWith("token")) {
    // set token from cookie
    token = req.headers.cookie.split("token")[1];
  }

  //   if token does not exist
  if (!token)
    return res
      .status(401)
      .json({ status: "fail", message: "Not authenticated" });

  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  try {
    // verify token
    const decoded: any = jwt.verify(token, JWT_SECRET_KEY);
    if (decoded.role != UserRole.SHOP_OWNER)
      return res
        .status(403)
        .json({ status: "fail", message: "Not authorized" });

    req.body.user = await User.findById(decoded.user_id);
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message,
      message: "Internal server error",
    });
  }
};

export default storeOwnerGuard;
