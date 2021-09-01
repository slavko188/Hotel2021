import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./photo.entity";
import { Room } from "./room.entity";

@Entity("photo_room")
export class PhotoRoom {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_room", unsigned: true })
  photoRoomId: number;

  @Column({ name: "room_id", type: "int", unsigned: true })
  roomId: number;

  @Column({ name: "photo_id", type: "int", unsigned: true })
  photoId: number;

  @ManyToOne(() => Photo, (photo) => photo.photoRoom, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
})
  
@JoinColumn([{ name: "photo_id", referencedColumnName: "photoId" }])
photo: Photo[];


  @ManyToOne(() => Room, (room) => room.photoRoom, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "room_id", referencedColumnName: "roomId" }])
  room: Room;
}