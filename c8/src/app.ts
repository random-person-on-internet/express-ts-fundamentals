import express from "express";

import { BookController } from "./controllers/BookConroller";
import { BookService } from "./services/BookService";
import { InMemoryBookRepository } from "./repositories/InMemoryBookRepository";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const bookRepository = new InMemoryBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

app.post("/books/:id/borrow", (req, res) => {
  return bookController.borrowBook(req, res);
});

app.post("/books/:id/delete", (req, res) => {
  return bookController.deleteBook(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
