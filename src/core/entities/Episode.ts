import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { IBaseEntity } from "./interfaces/IBaseEntity";
import { Show } from "./Show";
import { Media } from "./Media";
import { Season } from "./Season";

@Entity("v_episode")
@ObjectType({ implements: IBaseEntity })
export class Episode extends IBaseEntity {
  @Field()
  @Column({ unique: true })
  pos!: number;

  @Field()
  @Column()
  name!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description!: string;

  @ManyToOne(() => Season)
  @JoinColumn({
    name: "season_id",
    referencedColumnName: "id",
  })
  season!: Season;

  @Field({ nullable: true })
  @OneToOne(() => Media, { nullable: true })
  @JoinColumn({
    name: "media_id",
    referencedColumnName: "id",
  })
  media!: Media;
}
