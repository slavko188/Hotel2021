import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { Hall } from "./hall.entity";
import { Room } from "./room.entity";

@Entity("photo")
export class Photo {
  @PrimaryGeneratedColumn({ name: 'photo_id', type: 'int', unsigned: true })
  photoId: number;

  @Column({ type: "int", name: "hall_id", unsigned: true })
  hallId: number;

  @Column({ type: "int", name: "room_id", unsigned: true })
  roomId: number;

  @Column({
    type: "varchar",
    name: "image_path",
    unique: true,
    length: 128

  })
  imagePath: string;

  @ManyToOne(
    () => Hall,
    hall => hall,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
    
  )
  @ManyToOne(
    () => Room,
    room => room,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "hall_id", referencedColumnName: "hallId" }])
  hall: Hall;

  @JoinColumn([{ name: "room_id", referencedColumnName: "roomId" }])
  room: Room;

}