import { PaginatedResponse } from "../../utils/PaginatedResponse";
import { Show } from "../../../entities/Show";
import { ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedShowResponse extends PaginatedResponse(Show) {}
