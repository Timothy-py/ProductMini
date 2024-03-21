import mongoose, { Connection, model } from "mongoose";

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
    console.log(error);
    return process.exit(0)
  });

//   mongoose.connection.on("connection", (connection: Connection) => {
//     "Connection to MongoDB Database established successfully";
//   });
};

export default connectDB;
