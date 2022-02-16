import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Media } from "./Media";
import { Genre } from "./Genre";
import { Season } from "./Season";
import { TypeormLoader } from "type-graphql-dataloader";
import { IDisableEntity } from "./interfaces/IDisableEntity";
import { IBaseEntity } from "./interfaces/IBaseEntity";

@Entity("v_show")
@ObjectType({ implements: [IDisableEntity, IBaseEntity] })
export class Show extends IDisableEntity {
  @Column()
  @Field()
  name!: string;

  @Field()
  @Column()
  description!: string;

  @Field({ nullable: true })
  @Column()
  bg_image!: Date;

  @Field()
  @Column("int2")
  content_type!: number;

  @Field((type) => Media, { nullable: true })
  @OneToOne(() => Media)
  @JoinColumn({
    name: "media_id",
    referencedColumnName: "id",
  })
  @TypeormLoader()
  media!: Media;

  @Field((type) => [Genre])
  @ManyToMany(() => Genre)
  @JoinTable({
    name: "v_show_genre",
    joinColumn: {
      name: "show_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "genre_id",
      referencedColumnName: "id",
    },
  })
  @TypeormLoader()
  genres!: Genre[];

  @Field((type) => [Season])
  @OneToMany(() => Season, (season) => season.show)
  @TypeormLoader()
  seasons!: Season[];
}
