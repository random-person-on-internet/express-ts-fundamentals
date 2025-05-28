import express from "express";
import {
  register,
  login,
  userEvent,
  adminEvent,
} from "../controllers/user.controller.js";
import { verifyUserToken, IsAdmin, IsUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/events", verifyUserToken, IsUser, userEvent);
router.get("/special", verifyUserToken, IsAdmin, adminEvent);

export default router;
