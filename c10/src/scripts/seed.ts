import mongoose from "mongoose";
import dotenv from "dotenv";
import { WatchHistory } from "../models/watchHistory.model";
import connectDB from "../db";

dotenv.config();

const seedData = [
  {
    movie: "Edge of Tomorrow",
    genre: "Sci-Fi",
    country: "USA",
    views: 15000,
    rating: 8.2,
    year: 2024,
  },
  {
    movie: "Inception",
    genre: "Sci-Fi",
    country: "USA",
    views: 20000,
    rating: 8.8,
    year: 2024,
  },
  {
    movie: "Titanic",
    genre: "Romance",
    country: "USA",
    views: 25000,
    rating: 7.9,
    year: 2023,
  },
  {
    movie: "Parasite",
    genre: "Thriller",
    country: "South Korea",
    views: 12000,
    rating: 8.6,
    year: 2024,
  },
  {
    movie: "Interstellar",
    genre: "Sci-Fi",
    country: "USA",
    views: 18000,
    rating: 8.7,
    year: 2024,
  },
  {
    movie: "The Notebook",
    genre: "Romance",
    country: "USA",
    views: 8000,
    rating: 7.4,
    year: 2024,
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    const inserted = await WatchHistory.insertMany(seedData);
    console.log(`Inserted ${inserted.length} watch history records`);

    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error}`);
    process.exit(1);
  }
};

seedDB();
