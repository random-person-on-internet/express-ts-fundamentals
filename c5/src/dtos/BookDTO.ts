import { Expose, Exclude } from "class-transformer";

export class BookDTO {
  @Expose()
  title!: string;

  @Expose()
  author!: string;

  @Expose()
  publishedYear!: number;

  @Expose()
  isbn!: string;

  @Exclude()
  internalNotes!: string;
}
