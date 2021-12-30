import { Field, InputType } from "type-graphql";
import { Book } from "../../entities/Book";
import { Length } from "class-validator";

@InputType()
export class BookInput implements Partial<Book> {
  @Field()
  @Length(1, 200)
  title!: string;
}
