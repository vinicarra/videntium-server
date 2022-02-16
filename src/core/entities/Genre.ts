import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { IDisableEntity } from "./interfaces/IDisableEntity";
import { IBaseEntity } from "./interfaces/IBaseEntity";

@Entity("v_genre")
@ObjectType({ implements: [IDisableEntity, IBaseEntity] })
export class Genre extends IDisableEntity {
  @Field()
  @Column()
  name!: string;
}
