import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnection from "./src/db/dbConnection.js";
import userRouter from "./src/routes/userRouter.js";
import errorMiddleware from "./src/middlewares/error.js";
// import blogRouter from './src/routes/blogRouter.js';

const app = express();
dotenv.config();

app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

dbConnection();

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.use("/api/v1", userRouter);

export default app;
