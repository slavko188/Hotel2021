import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserHall } from "./user-hall.entity";
import { UserRoom } from "./user-room.entity";
//import Validator from 'class-validator';

@Index("uq_user_username", ["username"], { unique: true })
@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column({
    type: "varchar",
    name: "username",
    unique: true,
    length: 32,
    
  })
  //@Validator.IsNotEmpty()
  //@Validator.IsString()
  //@Validator.Matches(/^[a-z][a-z0-9\.]{3,32}[a-z0-9]$/)
  username: string;

  @Column({
    type: "tinyint",
    name: "is_active",
    unsigned: true,
  })
 //@Validator.IsNotEmpty()
  //@Validator.IsPositive()
  //@Validator.IsIn([0,1])
  isActive: number;

  @Column({ type: "varchar", name: "forename", length: 64 })
  // @Validator.IsNotEmpty()
  //@Validator.IsString()
 //@Validator.Length(2, 64)
  forename: string;

  @Column({ name: "surname", type: "varchar", length: 64 })
  //@Validator.IsNotEmpty()
  //@Validator.IsString()
  // @Validator.Length(2, 64)
  surname: string;

  @Column({
    type: "varchar",
    name: "password_hash",
    length: 128,
    
  })
  //@Validator.IsNotEmpty()
  //@Validator.IsHash('sha512')
  passwordHash: string;

  @OneToOne(() => UserHall, (userHall) => userHall.user)
  userHall: UserHall;

  @OneToOne(() => UserRoom, (userRoom) => userRoom.user)
  userRoom: UserRoom;
}
