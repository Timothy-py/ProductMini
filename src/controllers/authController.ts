import { Request, Response } from "express";
import { validateSignup } from "../utilities/validators";
import Auth from "../models/authModel";
import User from "../models/userModel";


/**
 * @description User signup`
 * @route `/api/v1/auth/signup`
 * @access Public
 * @type POST
 */
export const signup = async (req: Request, res: Response): Promise<any> => {
  // Validate the request body
  const { error, value } = validateSignup(req.body);
  if (error) return res.status(400).send(error.details);

  const { email, firstName, lastName, role, username, password } = value;

  // check if user exist
  const accountExist = await Auth.findOne({
    email: email,
  });

  if (accountExist)
    return res
      .status(409)
      .json({ status: "fail", message: "An account already exists" });

  // Create authentication profile
  const authProfile = new Auth({ email: email, password: password });
  await authProfile.save();

  // Create user profile
  const userProfile = new User({
    _authId: authProfile._id,
    firstName: firstName,
    lastName: lastName,
    role: role,
    username: username,
  });
  await userProfile.save();

  return res.status(201).json({
    status: "success",
    message: "User created successfully"
  });
};
