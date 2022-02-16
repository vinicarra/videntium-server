import { IBaseEntity } from "./IBaseEntity";
import { Field, InterfaceType } from "type-graphql";
import { Column } from "typeorm";

@InterfaceType({ implements: IBaseEntity })
export class IDisableEntity extends IBaseEntity {
  @Column()
  @Field((type) => Boolean)
  disabled!: boolean;
}
