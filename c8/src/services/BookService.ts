import { IBookRepository } from "../repositories/interfaces/IBookRepository";
import { Book } from "../models/Book";

export class BookService {
  constructor(private bookRepository: IBookRepository) {}

  async borrowBook(id: string): Promise<Book> {
    const book = await this.bookRepository.findById(id);

    if (!book) throw new Error("Book not found");
    if (book.isBorrowed) throw new Error("Book already borrowed");

    book.isBorrowed = true;

    const updateBook = { ...book, isBorrowed: true };
    await this.bookRepository.save(updateBook);
    return updateBook;
  }

  async deleteBook(id: string): Promise<Book | null> {
    const book = await this.bookRepository.delete(id);
    if (!book) throw new Error("Book not found");
    return book;
  }
}
