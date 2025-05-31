import express from "express";
import dotenv from "dotenv";
import connectDB from "./db";

import menuRouter from "./routes/menu.routes";

dotenv.config();
const app = express();
app.use("/api/menu", menuRouter);

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("App error:", err);
      throw err;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
