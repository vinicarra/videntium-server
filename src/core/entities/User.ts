import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IBaseEntity } from "./interfaces/IBaseEntity";
import { Role } from "./Role";

@Entity("v_user")
@ObjectType({ implements: IBaseEntity })
export class User extends IBaseEntity {
  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field((type) => Date)
  @Column("date")
  birth_date!: Date;

  @Field({ nullable: true })
  @Column()
  profile_picture!: string;

  @Field((type) => [Role])
  @ManyToMany(() => Role, { eager: true })
  @JoinTable({
    name: "v_user_role",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "role_id", referencedColumnName: "id" },
  })
  roles!: Role[];
}
