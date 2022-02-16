import { IBaseEntity } from "./interfaces/IBaseEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@Entity("v_user_token")
@ObjectType({ implements: IBaseEntity })
export class UserToken extends IBaseEntity {
  @Field()
  @Column()
  refresh_token!: string;

  @Field((type) => Date)
  @Column("timestamp")
  expire_date!: Date;

  @Field((type) => Boolean)
  @Column()
  revoked!: boolean;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user!: User;
}
