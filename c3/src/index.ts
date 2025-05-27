import express, { Request, Response } from "express";
import applicationRoutes from "./routes/application.routes";

const app = express();
app.use(express.json());

app.use("/api", applicationRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
