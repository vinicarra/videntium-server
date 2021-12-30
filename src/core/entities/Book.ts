import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("book")
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id!: number;

  @Column()
  @Field()
  title!: string;
}
