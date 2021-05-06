import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Room } from "./room.entity";
import { User } from "./user.entity";

@Index("user_room_user_id", ["userId"], { unique: true })
@Index("user_room_room_id", ["roomId"], { unique: true })
@Entity("user_room")
export class UserRoom {
  @PrimaryGeneratedColumn({ type: "int", name: "user_room_id", unsigned: true })
  userRoomId: number;

  @Column({
    type: "int",
    name: "user_id",
    unique: true,
    unsigned: true,
  })
  userId: number;

  @Column({
    type: "int",
    name: "room_id",
    unique: true,
    unsigned: true,
  })
  roomId: number;

  @Column({type: "datetime",  name: "checks_in_at" })
  checksInAt: Date;

  @Column({type:"datetime",  name: "checks_out_at" })
  checksOutAt: Date;

  @Column({
    type:"decimal",
    name: "price",
    precision: 10,
    scale: 2,
    
  })
  price: number;

  @Column({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToOne(() => Room, (room) => room.userRoom, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "room_id", referencedColumnName: "roomId" }])
  room: Room;

  @OneToOne(() => User, (user) => user.userRoom, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
