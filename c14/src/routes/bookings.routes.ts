import express from "express";
import { getPaginatedBookings } from "../controllers/booking.controller";

const router = express.Router();

router.get("/", getPaginatedBookings);

export default router;
