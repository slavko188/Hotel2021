import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { PhotoHall } from "./photo-hall.entity";
import { PhotoRoom } from "./photo-room.entity";
import * as Validator from 'class-validator';


@Entity("photo")
export class Photo {
  @PrimaryGeneratedColumn({ name: 'photo_id', type: 'int', unsigned: true })
  photoId: number;


  @Column({
    type: "varchar",
    name: "image_path",
    unique: true,
    length: 128

  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length( 1, 128)
  imagePath: string;
 
  @OneToMany(() => PhotoHall, (photoHall) => photoHall.photo)
  photoHall: PhotoHall[];

  @OneToMany(() => PhotoRoom, (photoRoom) => photoRoom.photo)
  photoRoom: PhotoRoom[];


}