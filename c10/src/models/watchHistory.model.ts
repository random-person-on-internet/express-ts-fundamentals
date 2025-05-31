import mongoose, { Document } from "mongoose";

export interface IWatchHistory extends Document {
  movie: string;
  genre: string;
  country: string;
  views: number;
  rating: number;
  year: number;
}

const WatchHistorySchema = new mongoose.Schema<IWatchHistory>(
  {
    movie: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const WatchHistory = mongoose.model<IWatchHistory>(
  "WatchHistory",
  WatchHistorySchema
);
