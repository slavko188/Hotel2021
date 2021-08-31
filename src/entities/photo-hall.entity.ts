import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hall } from "./hall.entity";
import { Photo } from "./photo.entity";

@Entity("photo_hall")
export class PhotoHall {
  @PrimaryGeneratedColumn({ type: "int", name: "hall_photo", unsigned: true })
  hallPhotoId: number;

  @Column({ name: "hall_id", type:"int", unsigned: true })
  hallId: number;

  @Column({ name: "photo_id",type:"int", unsigned: true })
  photoId: number;

  @OneToMany(() => Hall, (hall) => hall.hallId, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "hall_id", referencedColumnName: "hallId" }])
  hall: Hall;

  @OneToMany(() => Photo, (photo) => photo.hall, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "photo_id", referencedColumnName: "photoId" }])
  photo: Photo;
}