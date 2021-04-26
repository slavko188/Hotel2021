import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserHall } from "./user-hall.entity";
import { UserRoom } from "./user-room.entity";

@Index("uq_user_username", ["username"], { unique: true })
@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column({
    type: "varchar",
    name: "username",
    unique: true,
    length: 60,
    
  })
  username: string;

  @Column({
    type: "tinyint",
    name: "is_active",
    unsigned: true,
  })
  isActive: number;

  @Column({ type: "varchar", name: "forename", length: 64 })
  forename: string;

  @Column({ name: "surname", type: "varchar", length: 64})
  surname: string;

  @Column({
    type: "varchar",
    name: "password_hash",
    length: 128,
    
  })
  passwordHash: string;

  @OneToOne(() => UserHall, (userHall) => userHall.user)
  userHall: UserHall;

  @OneToOne(() => UserRoom, (userRoom) => userRoom.user)
  userRoom: UserRoom;
}
