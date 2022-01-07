import { Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Show } from "../entities/Show";

@Resolver()
export class ShowResolver {
  @Query(() => [Show])
  async shows(): Promise<Show[]> {
    return getConnection().manager.find(Show);
  }
}
