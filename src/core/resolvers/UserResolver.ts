import { Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";

@Resolver((_of) => User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return getConnection().manager.find(User);
  }
}
