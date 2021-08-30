import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hall } from "./hall.entity";
import { Photo } from "./photo.entity";

@Entity("photo_hall")
export class HallFeature {
  @PrimaryGeneratedColumn({ type: "int", name: "hall_photo", unsigned: true })
  hallPhotoId: number;

  @Column({ name: "hall_id", type:"int", unsigned: true })
  hallId: number;

  @Column({ name: "photo_id",type:"int", unsigned: true })
  photoId: number;

  @ManyToOne(() => Hall, (hall) => hall.hallId, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "hall_id", referencedColumnName: "hallId" }])
  hall: Hall;

  @ManyToOne(() => Photo, (photo) => photo.photoId, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "photo_id", referencedColumnName: "photoId" }])
  photo: Photo;
}