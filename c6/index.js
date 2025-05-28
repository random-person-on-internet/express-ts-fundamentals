import express from "express";
import errorRouter from "./routes/index.route.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", errorRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is activated");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
