import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IBaseEntity } from "./interfaces/IBaseEntity";

@Entity("v_role")
@ObjectType({ implements: IBaseEntity })
export class Role extends IBaseEntity {
  @Column()
  @Field()
  name!: string;
}
