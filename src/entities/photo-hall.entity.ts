import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hall } from "./hall.entity";
import { Photo } from "./photo.entity";

@Entity("photo_hall")
export class PhotoHall {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_hall", unsigned: true })
  photoHallId: number;

  @Column({ name: "hall_id", type:"int", unsigned: true })
  hallId: number;


  @OneToMany(() => Hall, (hall) => hall.hallId, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "hall_id", referencedColumnName: "hallId" }])
  hall: Hall;

}