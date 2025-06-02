| Method | Endpoint         | Description    | Request Body                             |
| ------ | ---------------- | -------------- | ---------------------------------------- |
| GET    | `/api/books`     | Get all books  | -                                        |
| GET    | `/api/books/:id` | Get book by ID | -                                        |
| POST   | `/api/books`     | Create a book  | `{ "title": "", "author": "", "year": }` |
| PUT    | `/api/books/:id` | Update a book  | Partial or full Book fields              |
| DELETE | `/api/books/:id` | Delete a book  | -                                        |
