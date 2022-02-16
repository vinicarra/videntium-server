import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Role } from "./Role";
import { TypeormLoader } from "type-graphql-dataloader";
import { IDisableEntity } from "./interfaces/IDisableEntity";
import { UserToken } from "./UserToken";
import { IBaseEntity } from "./interfaces/IBaseEntity";

@Entity("v_user")
@ObjectType({ implements: [IDisableEntity, IBaseEntity] })
export class User extends IDisableEntity {
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
  @ManyToMany(() => Role)
  @JoinTable({
    name: "v_user_role",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "role_id", referencedColumnName: "id" },
  })
  @TypeormLoader()
  roles!: Role[];

  @Field((type) => [UserToken])
  @OneToMany(() => UserToken, (userToken) => userToken.user)
  @TypeormLoader()
  refresh_tokens!: UserToken[];
}
