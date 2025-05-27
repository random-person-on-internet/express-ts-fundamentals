import express, { Request, Response } from "express";
import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { OrderController } from "./controllers/order.controller";
import { BakingController } from "./controllers/baking.controller";

const app = createExpressServer({
  controllers: [OrderController, BakingController],
});

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Starting dev");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
