import express from "express";
import { logDischargeRequest } from "./middlewares/logDischargeRequest";
import { errorHandler } from "./middlewares/errorHandler";
import dischargeRoutes from "./routes/discharge.route";

const app = express();
app.use(express.json());
app.use(logDischargeRequest);
app.use(dischargeRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the Hospital Discharge System");
});
app.listen(PORT, () =>
  console.log(`Hospital system running on port http://localhost:${PORT}`)
);
