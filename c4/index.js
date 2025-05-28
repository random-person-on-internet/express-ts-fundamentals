import express from "express";
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;

import authRoute from "./routes/index.routes.js";
app.use("/api", authRoute);

app.get("/", (req, res) => {
  res.send("API active");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
