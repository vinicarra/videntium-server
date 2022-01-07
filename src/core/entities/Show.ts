import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IBaseEntity } from "./interfaces/IBaseEntity";
import { Media } from "./Media";
import { Genre } from "./Genre";
import { Season } from "./Season";

@Entity("v_show")
@ObjectType({ implements: IBaseEntity })
export class Show extends IBaseEntity {
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
  @OneToOne(() => Media, { eager: true })
  @JoinColumn({
    name: "media_id",
    referencedColumnName: "id",
  })
  media!: Media;

  @Field((type) => [Genre])
  @ManyToMany(() => Genre, { eager: true })
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
  genres!: Genre[];

  @Field((type) => [Season])
  @OneToMany(() => Season, (season) => season.show, { eager: true })
  seasons!: Season[];
}
