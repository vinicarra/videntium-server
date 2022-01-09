import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class PaginatedInput {
  @Field((type) => Int)
  page: number = 1;
}
