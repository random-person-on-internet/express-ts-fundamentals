import { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  const books = await Book.find();
  res.status(200).json(books);
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(400).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(book);
  } catch (e) {
    next(e);
  }
};

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, author, year } = req.body;
  const book = new Book({ title, author, year });
  await book.save();
  res.status(201).json(book);
};

export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) {
    res.status(400).json({ message: "Book not found " });
    return;
  }
  res.status(200).json(updated);
};

export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const deleted = await Book.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(400).json({ message: "Book not found" });
    return;
  }
  res.status(200).json({ message: "Book deleted successfully" });
};
