import { Args, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Show } from "../entities/Show";
import { PaginatedShowResponse } from "./types/responses/PaginatedShowResponse";
import { ShowInput } from "./types/inputs/ShowInput";

@Resolver()
export class ShowResolver {
  @Query(() => PaginatedShowResponse)
  async shows(@Args() { page }: ShowInput): Promise<PaginatedShowResponse> {
    const perPage = 2;
    const skipping = perPage * page - perPage;

    const [items, numberOfItems] = await getConnection().manager.findAndCount(
      Show,
      {
        take: perPage,
        skip: skipping,
      }
    );

    return {
      items,
      totalPages: Math.ceil(numberOfItems / perPage),
      currentPage: page,
      totalCount: numberOfItems,
    };
  }
}
