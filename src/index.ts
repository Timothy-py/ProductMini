import "dotenv/config";
import express, { Request, Response } from "express";

import connectDB from "./services/connectDB";
import logger from "./utilities/logger";

const APP_PORT: number = parseInt(process.env.APP_PORT);

const app = express();

// ROUTES
app.get("/", (req: Request, res: Response) => {
  return res.send("ProductMini v1 API");
});
import authRouter from "./routes/authRoute";
import storeRouter from "./routes/storeRoute";
import productRouter from "./routes/productRoute";
import eventListeners from "./events/eventListener";

// MIDDLEWARES
app.use(express.json());

// SET ROUTES
const BASE_PATH = '/api/v1'
app.use(`${BASE_PATH}/auth`, authRouter);
app.use(`${BASE_PATH}/stores`, storeRouter);
app.use(`${BASE_PATH}/products`, productRouter);

// CONNECT DATABASE
connectDB();

// LOAD EVENT LISTENERS
eventListeners()

app.listen(APP_PORT, () => {
  logger.info(`Server is running on PORT: ${APP_PORT}`);
  console.log(`Server is running on PORT: ${APP_PORT}`);
});

export default app;
