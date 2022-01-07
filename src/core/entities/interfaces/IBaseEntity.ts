import { Field, ID, InterfaceType } from "type-graphql";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@InterfaceType()
export class IBaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id!: string;

  @Column("timestamptz")
  @Field((type) => Date)
  created_at!: Date;

  @Column("timestamptz")
  @Field((type) => Date)
  updated_at!: Date;
}
