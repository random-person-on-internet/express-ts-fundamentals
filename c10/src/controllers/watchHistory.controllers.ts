import { Request, Response } from "express";
import { WatchHistory } from "../models/watchHistory.model";

export const getGenreStatsInUSA = async (req: Request, res: Response) => {
  try {
    const result = await WatchHistory.aggregate([
      { $match: { country: "USA" } },
      {
        $group: {
          _id: "$genre",
          totalViews: { $sum: "$views" },
          avgRating: { $avg: "$rating" },
        },
      },
      {
        $project: {
          _id: 0,
          genre: "$_id",
          totalViews: 1,
          avgRating: { $round: ["$avgRating", 2] },
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: `Aggregation failed: ${error}` });
  }
};

export const getTop5Movies2024 = async (req: Request, res: Response) => {
  try {
    const result = await WatchHistory.aggregate([
      {
        $match: {
          year: 2024,
        },
      },
      {
        $sort: {
          views: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          movie: 1,
          views: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: `Aggregation failed: ${error}` });
  }
};

export const getGenreCounts = async (req: Request, res: Response) => {
  try {
    const result = await WatchHistory.aggregate([
      {
        $group: {
          _id: "$genre",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          genre: "$_id",
          count: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: `Aggregation failed: ${error}` });
  }
};

export const getTopGenres2024 = async (req: Request, res: Response) => {
  try {
    const result = await WatchHistory.aggregate([
      // filter for 2024
      {
        $match: {
          year: 2024,
        },
      },

      // find avg ratings and total views
      {
        $group: {
          _id: "$genre",
          totalViews: {
            $sum: "$views",
          },
          avgRating: {
            $avg: "$rating",
          },
        },
      },

      // filter for more than 10000 views
      {
        $match: {
          totalViews: { $gt: 10000 },
        },
      },

      // make format for output
      {
        $project: {
          _id: 0,
          genre: "$_id",
          totalViews: 1,
          avgRating: {
            $round: ["$avgRating", 1],
          },
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: `Aggregation failed: ${error}` });
  }
};
