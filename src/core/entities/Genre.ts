import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { IBaseEntity } from "./interfaces/IBaseEntity";

@Entity("v_genre")
@ObjectType({ implements: IBaseEntity })
export class Genre extends IBaseEntity {
  @Field()
  @Column()
  name!: string;
}
