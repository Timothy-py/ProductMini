import { Request, Response } from "express";
import { validatecreateStore } from "../utilities/validators";
import Store from "../models/storeModel";

/**
 * @description Create a store`
 * @route `/api/v1/store`
 * @access Private
 * @type POST
 */
export const createStore = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Validate the request body
    const { error, value } = validatecreateStore(req.body);
    if (error) return res.status(400).send(error.details);

    const ID = req["user"]._authId;
    const newStore = new Store({
      _authId: ID,
      ...value,
    });
    const savedStore = await Store.create(newStore);
    return res.status(200).json({
      status: "success",
      message: "Store created successfully",
      data: savedStore,
    });
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(409)
        .json({
          status: "fail",
          message: "A store with that name already exists",
        });
    return res.status(500).json({
      status: "error",
      error: error.message,
      message: "An error occurred",
    });
  }
};
