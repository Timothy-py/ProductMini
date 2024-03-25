import { Request, Response } from "express";
import { validateAddProduct } from "../utilities/validators";
import randomImageNameGenerator from "../helpers/nameGenerator";
import resize from "../utilities/imgResize";
import { s3_signedUrl, s3_upload } from "../utilities/awsS3";
import Store from "../models/storeModel";
import Product from "../models/productModel";
import eventEmitter from "../events/event";
import cache from "../services/connectRedis";

/**
 * @description Add product to a store`
 * @route `/api/v1/products/add/:storeId`
 * @access Private
 * @type POST
 */
export const addProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const storeId = req.params.storeId;
    const authId = req["user"]._authId;
    // check store exists
    const store = await Store.findById(storeId);
    if (!store) {
      return res
        .status(404)
        .json({ status: "fail", message: "Store not found" });
    }

    // check if signed user is the owner of the store
    if (!authId.equals(store._authId))
      return res.status(403).json({
        status: "fail",
        message: "User is not the owner of the store",
      });

    // Validate the request body
    const { error, value } = validateAddProduct(req.body);
    if (error) return res.status(400).send(error.details);

    const image = req.file;
    if (!image) return res.status(400).send("image is required");
    const BUCKET_NAME: string = process.env.BUCKET_NAME;
    const imageNameID: string = randomImageNameGenerator();

    // resize the image
    const resizedImage = await resize(image.buffer);

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: imageNameID,
      Body: resizedImage,
      ContentType: image.mimetype,
    };
    const getParams = {
      Bucket: BUCKET_NAME,
      Key: imageNameID,
    };

    // Upload image to s3 and get back URI
    const [, uri] = await Promise.all([
      s3_upload(uploadParams),
      s3_signedUrl(getParams),
    ]);

    const newProduct = new Product({
      _storeId: storeId,
      imageUrl: uri,
      ...value,
    });
    const addedProduct = await Product.create(newProduct);

    // Emit event to increment total store products count
    eventEmitter.emit("productAdded", { storeId: storeId });

    return res.status(200).json({
      status: "success",
      message: "Product added successfully",
      data: addedProduct,
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
 * @description Get a product`
 * @route `/api/v1/products/:productId`
 * @access Public
 * @type GET
 */
export const getProductDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const productId: string = req.params.productId;

    // Retrieve from cache
    const cachedProduct = await cache.get(`product/${productId}`);

    if (cachedProduct) {
      return res.status(200).json({
        status: "success",
        message: "Product details retrieved successfully",
        data: JSON.parse(cachedProduct),
      });
    }

    // Retrieve from DB
    const product = await Product.findById(productId).populate("_storeId");

    if (!product)
      return res
        .status(404)
        .json({ status: "fail", message: "Product not found" });

    // cache data
    await cache.set(`product/${productId}`, JSON.stringify(product), "EX", 60);

    return res.status(200).json({
      status: "success",
      message: "Product details retrieved successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message,
      message: "An error occurred",
    });
  }
};
