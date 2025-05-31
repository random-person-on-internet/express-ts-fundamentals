import express from "express";
import {
  transferMoney,
  refundMoney,
} from "../controllers/transaction.controllers";

const router = express.Router();
router.post("/transfer", transferMoney);
router.post("/refund", refundMoney);

export default router;
