import mongoose, { Connection, model } from "mongoose";
import logger from "../utilities/logger";

const connectDB = async () => {
  let DATABASE_URI: string;
  const NODE_ENV: string = process.env.NODE_ENV;

  if (NODE_ENV === "production") {
    DATABASE_URI = "";
  } else if (NODE_ENV === "development") {
    DATABASE_URI = "";
  } else if (NODE_ENV === "staging") {
    DATABASE_URI = "";
  } else {
    DATABASE_URI = "mongodb://127.0.0.1:27017/productmini";
  }

  await mongoose.connect(DATABASE_URI);

  mongoose.connection.on("error", (error: Error) => {
    logger.error(`Error connecting to Database: ${error.message}`);
    return process.exit(0)
  });

  logger.info('Connection to Mongodb database established successfully')
};

export default connectDB;
