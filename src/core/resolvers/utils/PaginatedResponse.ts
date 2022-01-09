import { ClassType, Field, Int, ObjectType } from "type-graphql";

export function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field((type) => [TItemClass])
    items!: TItem[];

    @Field((type) => Int)
    totalCount!: number;

    @Field((type) => Int)
    currentPage!: number;

    @Field((type) => Int)
    totalPages!: number;
  }

  return PaginatedResponseClass;
}
