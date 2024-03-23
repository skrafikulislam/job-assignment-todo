import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import TodoRouter from "./routes/TodoRoute.js";
import AuthRouter from "./routes/AuthRoutes.js";
import { userVerification } from "./middleware/AuthMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(cookieParser());

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("MongoDb Successfully Connected ");
  })
  .catch((err) => console.log(err));



app.use(TodoRouter);
app.use("/", AuthRouter);
app.post("/userverify", userVerification);

app.listen(process.env.PORT, () => {
  console.log(`Server is Connected to Port ${process.env.PORT}`);
});
