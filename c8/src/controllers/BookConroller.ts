import { Request, Response } from "express";

import { BookService } from "../services/BookService";

export class BookController {
  constructor(private bookService: BookService) {}

  async borrowBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookService.borrowBook(req.params.id);
      res.json(book);
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  async deleteBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookService.deleteBook(req.params.id);
      res.json(book);
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
}
