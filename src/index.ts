import "dotenv/config";
import express from "express";
import { Request, Response } from "express";

const APP_PORT: number = parseInt(process.env.APP_PORT);

const app = express();

// ROUTES
app.get("/", (req: Request, res: Response) => {
  return res.send("ProductMini V1 API");
});
const authRoutes: any = import("./routes/authRoute");

// MIDDLEWARES
app.use(express.json());

// SET ROUTES
app.use("/api/v1/auth", authRoutes);

app.listen(APP_PORT, () => {
  console.log("Server is running on PORT: ", APP_PORT);
});

module.exports = app;
