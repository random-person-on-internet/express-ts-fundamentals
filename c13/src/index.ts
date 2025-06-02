import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import bookRouter from "./routes/book.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
app.use(express.json());
app.use("/api/books", bookRouter);
app.use(errorHandler);
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.error(`Mongo connection error: ${err}`));
