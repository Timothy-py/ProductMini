import { Request, Response } from "express";
import { validateSignin, validateSignup } from "../utilities/validators";
import Auth from "../models/authModel";
import User from "../models/userModel";
import sendTokenResponse from "../utilities/tokenResponse";

/**
 * @description User signup`
 * @route `/api/v1/auth/signup`
 * @access Public
 * @type POST
 */
export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
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
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "An error occurred",
    });
  }
};

/*
 * @description User sigin`
 * @route `/api/v1/auth/signin`
 * @access Public
 * @type POST
 */
export const signin = async (req: Request, res: Response): Promise<any> => {
  try {
    // Validate the request body
    const { error, value } = validateSignin(req.body);
    if (error) return res.status(400).send(error.details);

    const { email, password } = value;

    // Find the user
    const authProfile = await Auth.findOne({
      email: email,
    });

    if (!authProfile)
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });

    // check if password matches
    const isMatch = await authProfile.matchPassword(password);

    if (!isMatch)
      return res
        .status(401)
        .json({ status: "fail", message: "Incorrect password" });

    // Get user
    const user = await User.findOne({ _authId: authProfile._id });

    sendTokenResponse(user, res, {email: email});
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "An error occurred",
    });
  }
};
