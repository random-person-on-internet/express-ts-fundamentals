import { Request, Response } from "express";
import { MenuItem } from "../models/menu.model";

// add dish
export const addTofuBuddhaBowl = async (req: Request, res: Response) => {
  try {
    const newItem = await MenuItem.create({
      name: "Tofu Buddha Bowl",
      cuisine: "Asian",
      price: 9.5,
      tags: ["vegan", "gluten-free"],
      available: true,
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: `Failed to add dish: ${error}` });
  }
};

// find all available vegan dishes under $12
export const getAvailableVeganUnder12 = async (req: Request, res: Response) => {
  try {
    const dishes = await MenuItem.find({
      tags: "vegan",
      available: true,
      price: { $lt: 12 },
    }).select("name price -_id");

    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: `Failed to fetch dishes: ${error}` });
  }
};

// update price and add "popular" tag
export const updateTofuBowl = async (req: Request, res: Response) => {
  try {
    const updated = await MenuItem.findOneAndUpdate(
      { name: "Tofu Buddha Bowl" },
      {
        $set: { price: 10.0 },
        $addToSet: { tags: "popular" },
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Dish not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: `Update failed: ${error}` });
  }
};

// delete
export const deleteOldSoup = async (req: Request, res: Response) => {
  try {
    const result = await MenuItem.findOneAndDelete({
      name: "Old Special Soup",
    });

    if (!result) return res.status(404).json({ message: "Dish not found" });

    res.status(200).json({ message: `"Old Special Soup" has been deleted.` });
  } catch (error) {
    res.status(500).json({ message: `Deletion failed: ${error}` });
  }
};
