import { IBookRepository } from "./interfaces/IBookRepository";
import { Book } from "../models/Book";

export class InMemoryBookRepository implements IBookRepository {
  private books: Book[] = [
    {
      id: "1",
      title: "Origin",
      author: "Dan Brown",
      isBorrowed: false,
    },
    {
      id: "2",
      title: "White Fang",
      author: "Jack London",
      isBorrowed: false,
    },
    {
      id: "3",
      title: "Tom Gates: Excellent Excuses",
      author: "Liz Pichon",
      isBorrowed: false,
    },
    {
      id: "4",
      title: "House of Leaves",
      author: "Mark Z. Danielewski",
      isBorrowed: false,
    },
    {
      id: "5",
      title: "Goosebumps: Welcome to Dead House",
      author: "R.L. Stine",
      isBorrowed: false,
    },
    {
      id: "6",
      title: "Goosebumps: Night of the Living Dummy",
      author: "R.L. Stine",
      isBorrowed: false,
    },
    {
      id: "7",
      title: "Goosebumps: Say Cheese and Die!",
      author: "R.L. Stine",
      isBorrowed: false,
    },
  ];

  async findAll(): Promise<Book[]> {
    return this.books;
  }

  async findById(id: string): Promise<Book | null> {
    return this.books.find((b) => b.id === id) || null;
  }

  async save(book: Book): Promise<void> {
    this.books.push(book);
  }

  async delete(id: string): Promise<Book | null> {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) {
      return null;
    }

    const [deletedBook] = this.books.splice(index, 1);
    return deletedBook;
  }
}
