import express from "express";
import {
  addTofuBuddhaBowl,
  deleteOldSoup,
  getAvailableVeganUnder12,
  updateTofuBowl,
} from "../controllers/menu.controllers";

const router = express.Router();

router.post("/add-tofu-bowl", addTofuBuddhaBowl);
router.get("/vegan-under-12", getAvailableVeganUnder12);
router.patch("/update-tofu-bowl", updateTofuBowl);
router.delete("/delete-old-soup", deleteOldSoup);

export default router;
