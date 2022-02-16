import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Show } from "./Show";
import { Episode } from "./Episode";
import { TypeormLoader } from "type-graphql-dataloader";
import { IDisableEntity } from "./interfaces/IDisableEntity";
import { IBaseEntity } from "./interfaces/IBaseEntity";

@Entity("v_season")
@ObjectType({ implements: [IDisableEntity, IBaseEntity] })
export class Season extends IDisableEntity {
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
  @OneToMany(() => Episode, (episode) => episode.season)
  @TypeormLoader()
  episodes!: Episode[];
}
