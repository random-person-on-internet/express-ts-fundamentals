import express from "express";
import bookRouter from "./routes/books.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.send("API active");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
