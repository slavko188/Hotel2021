import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hall } from "./hall.entity";
import { Photo } from "./photo.entity";
import { Room } from "./room.entity";

@Entity("photo_room")
export class PhotoRoom {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_room", unsigned: true })
  photoRoomId: number;

  @Column({ name: "room_id",type:"int", unsigned: true })
  roomId: number;

  @ManyToOne(() => Room, (room) => room.roomId, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "room_id", referencedColumnName: "roomId" }])
  room: Room;
}