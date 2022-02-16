import { Field, ID, InterfaceType } from "type-graphql";
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@InterfaceType()
export class IBaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id!: string;

  @CreateDateColumn()
  @Field((type) => Date)
  created_at!: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  updated_at!: Date;
}
