import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class PaginatedInput {
  @Field((type) => Int)
  limit: number = 5;

  @Field((type) => Int)
  page: number = 1;

  get skip() {
    return this.page * this.limit - this.limit;
  }
}
