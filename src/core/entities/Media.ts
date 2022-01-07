import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IBaseEntity } from "./interfaces/IBaseEntity";

@Entity("v_media")
@ObjectType({ implements: IBaseEntity })
export class Media extends IBaseEntity {
  @Field()
  @Column()
  url!: string;

  @Field({ nullable: true })
  @Column()
  intro_start!: number;

  @Field({ nullable: true })
  @Column()
  intro_end!: number;

  @Field({ nullable: true })
  @Column()
  outro_start!: number;
}
