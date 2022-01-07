import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { IBaseEntity } from "./interfaces/IBaseEntity";
import { Show } from "./Show";
import { Episode } from "./Episode";

@Entity("v_season")
@ObjectType({ implements: IBaseEntity })
export class Season extends IBaseEntity {
  @Field()
  @Column({ unique: true })
  pos!: number;

  @ManyToOne(() => Show)
  @JoinColumn({
    name: "show_id",
    referencedColumnName: "id",
  })
  show!: Show;

  @Field((type) => [Episode])
  @OneToMany(() => Episode, (episode) => episode.season, { eager: true })
  episodes!: Episode[];
}
