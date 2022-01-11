import { Args, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Show } from "../entities/Show";
import { PaginatedShowResponse } from "./types/responses/PaginatedShowResponse";
import { ShowInput } from "./types/inputs/ShowInput";
import { Logger } from "../utils/Logger";

@Resolver()
export class ShowResolver {
  @Query(() => PaginatedShowResponse)
  async shows(
    @Args() { page, limit, skip }: ShowInput
  ): Promise<PaginatedShowResponse> {
    const [items, numberOfItems] = await getConnection().manager.findAndCount(
      Show,
      {
        take: limit,
        skip,
      }
    );

    return {
      items,
      totalPages: Math.ceil(numberOfItems / limit),
      currentPage: page,
      totalCount: numberOfItems,
    };
  }
}
