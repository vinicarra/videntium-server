import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Book } from "../entities/Book";
import { getConnection } from "typeorm";
import { BookInput } from "./types/BookInput";

@Resolver((_of) => Book)
export class BookResolver {
  @Query((_returns) => [Book])
  async books(): Promise<Book[]> {
    return getConnection().manager.find(Book);
  }

  @Mutation(() => Book)
  async createBook(@Arg("data") { title }: BookInput): Promise<Book> {
    const book = await getConnection().manager.save(Book, { title });
    return book;
  }
}
