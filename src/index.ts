import "dotenv/config";
import express, { Request, Response } from "express";

import connectDB from "./services/connectDB";

const APP_PORT: number = parseInt(process.env.APP_PORT);

const app = express();

// ROUTES
app.get("/", (req: Request, res: Response) => {
  return res.send("ProductMini V1 API");
});
import authRouter from "./routes/authRoute";

// MIDDLEWARES
app.use(express.json());

// SET ROUTES
app.use("/api/v1/auth", authRouter);

// CONNECT DATABASE
connectDB();

app.listen(APP_PORT, () => {
  console.log("Server is running on PORT: ", APP_PORT);
});

export default app;
