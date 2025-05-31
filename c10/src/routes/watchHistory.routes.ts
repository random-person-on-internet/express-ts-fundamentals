import express from "express";
import {
  getGenreCounts,
  getTop5Movies2024,
  getGenreStatsInUSA,
  getTopGenres2024,
} from "../controllers/watchHistory.controllers";

const router = express.Router();

router.get("/genre-counts", getGenreCounts);
router.get("/top-5-movies-2024", getTop5Movies2024);
router.get("/genre-stats-usa", getGenreStatsInUSA);
router.get("/top-genres-2024", getTopGenres2024);

export default router;
