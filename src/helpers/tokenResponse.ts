import { Response } from "express";
import { IUser } from "../common/types/interface";

const JWT_COOKIE_EXPIRATION = +process.env.JWT_COOKIE_EXPIRATION;

const sendTokenResponse = (schema: IUser, res: Response, data:object) => {
  // Create token
  const token = schema.getSignedJWTToken();

  const options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRATION * 24 * 60 * 60),
    httpOnly: true,
    secure: false,
  };

  if (process.env.NODE_ENV == "production") options.secure = true;

  return res
    .status(200)
    .cookie("token", token, options)
    .json({
      status: "success",
      message: "User signed in successfully",
      data: { token, ...data, schema },
    });
};

export default sendTokenResponse;
