import express from "express";
import { plainToInstance } from "class-transformer";
import { BookDTO } from "../dtos/BookDTO";

const router = express.Router();

router.post("/", (req, res) => {
  const bookDTO = plainToInstance(BookDTO, req.body, {
    excludeExtraneousValues: true,
  });

  console.log(bookDTO);
  res.status(201).json({
    message: "Book recieved",
    book: bookDTO,
  });
});

router.get("/:id", (req, res) => {
  const book = {
    title: "Origin",
    author: "Dan Brown",
    publishedYear: 2017,
    isbn: "978-0-385-51423-1",
    internalNotes: "a really good book",
  };

  const bookDTO = plainToInstance(BookDTO, book, {
    excludeExtraneousValues: true,
  });

  res.json(bookDTO);
});

export default router;
