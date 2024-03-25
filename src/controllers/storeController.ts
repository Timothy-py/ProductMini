import { Request, Response } from "express";
import {
  validateEditStore,
  validatecreateStore,
} from "../utilities/validators";
import Store from "../models/storeModel";
// import cache from "../services/connectRedis";
import Product from "../models/productModel";

/**
 * @description Create a store`
 * @route `/api/v1/stores`
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
    return res.status(201).json({
      status: "success",
      message: "Store created successfully",
      data: savedStore,
    });
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).json({
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

/**
 * @description Get a store`
 * @route `/api/v1/stores/:storeId`
 * @access Public
 * @type GET
 */
export const getStoreDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const storeId: string = req.params.storeId;

    // Retrieve from cache
    // const cachedStore = await cache.get(`store/${storeId}`);

    // if (cachedStore) {
    //   return res.status(200).json({
    //     status: "success",
    //     message: "Store details retrieved successfully",
    //     data: JSON.parse(cachedStore),
    //   });
    // }

    // Retrieve from DB
    const store = await Store.findById(storeId);

    if (!store)
      return res
        .status(404)
        .json({ status: "fail", message: "Store not found" });

    // cache data
    // await cache.set(`store/${storeId}`, JSON.stringify(store), "EX", 60);

    return res.status(200).json({
      status: "success",
      message: "Store details retrieved successfully",
      data: store,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message,
      message: "An error occurred",
    });
  }
};

/**
 * @description Get my stores`
 * @route `/api/v1/stores/`
 * @access Private
 * @type GET
 */
export const getMyStores = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const authId = req["user"]._authId;

    // Retrieve from cache
    // const cachedStore = await cache.get(`mystores/${authId}`);

    // if (cachedStore) {
    //   return res.status(200).json({
    //     status: "success",
    //     message: "Stores retrieved successfully",
    //     data: JSON.parse(cachedStore),
    //   });
    // }

    const myStores = await Store.find({ _authId: authId });

    // // cache data
    // await cache.set(`mystores/${authId}`, JSON.stringify(myStores), "EX", 60);

    return res.status(200).json({
      status: "success",
      message: "Stores retrieved successfully",
      data: myStores,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message,
      message: "An error occurred",
    });
  }
};

/**
 * @description Edit a store`
 * @route `/api/v1/stores/:storeId`
 * @access Private
 * @type PATCH
 */
export const editStore = async (req: Request, res: Response): Promise<any> => {
  try {
    // Validate the request body
    const { error, value } = validateEditStore(req.body);
    if (error) return res.status(400).send(error.details);

    const authId = req["user"]._authId;
    const storeId: string = req.params.storeId;

    // Get store
    const store = await Store.findById(storeId);

    if (!store)
      return res
        .status(404)
        .json({ status: "fail", message: "Store not found" });

    // check if signed user is the owner of the store
    if (!authId.equals(store._authId))
      return res.status(403).json({
        status: "fail",
        message: "User is not the owner of the store",
      });

    // update the store
    const updatedStore = await Store.findByIdAndUpdate(
      storeId,
      { ...value },
      { new: true }
    );

    // cache data
    // await cache.set(`store/${storeId}`, JSON.stringify(updatedStore), "EX", 60);

    return res.status(200).json({
      status: "success",
      message: "Store updated successfully",
      data: updatedStore,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message,
      message: "An error occurred",
    });
  }
};

/**
 * @description Delete a store`
 * @route `/api/v1/stores/:storeId`
 * @access Private
 * @type DELETE
 */
export const deleteStore = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const authId = req["user"]._authId;
    const storeId: string = req.params.storeId;

    // Get store
    const store = await Store.findById(storeId);

    if (!store)
      return res
        .status(404)
        .json({ status: "fail", message: "Store not found" });

    // check if signed user is the owner of the store
    if (!authId.equals(store._authId))
      return res.status(403).json({
        status: "fail",
        message: "User is not the owner of the store",
      });

    // delete cached store
    // await cache.del(`store/${storeId}`);

    // delete the store
    await Store.findByIdAndDelete(storeId);

    return res.status(204).json({});
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message,
      message: "An error occurred",
    });
  }
};

/**
 * @description Get all products in a store`
 * @route `/api/v1/stores/:storeId/products`
 * @access Public
 * @type GET
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page: any = req.query.page ? req.query.page : 1;
    const perPage: any = req.query.perPage ? req.query.perPage : 5;
    const skip: number = (parseInt(page) - 1) * parseInt(perPage);

    const storeId: string = req.params.storeId;

    const products: any[] = await Product.find({ _storeId: storeId })
      .skip(skip)
      .limit(perPage);

    return res.status(200).json({
      status: "success",
      message: "Store products retrieved successfully",
      data: products,
      count: products.length,
      page: page,
      nextPage: parseInt(page) + 1,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message,
      message: "An error occurred",
    });
  }
};

// Helper function
export const incrementStoreProductCount = async (storeId: string) => {
  await Store.findByIdAndUpdate(storeId, { $inc: { total_products: 1 } });
  return true;
};
