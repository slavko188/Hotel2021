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

  @Column({ type: 'varchar', name: 'email', length: '255', unique: true, })
  email: string;

  @Column({ type: 'varchar', name: 'phone_number', length: '24', unique: true })
  phoneNumber: string;

  @Column({
    type: "varchar",
    name: "password_hash",
    length: 128,
    
  })
  //@Validator.IsNotEmpty()
  //@Validator.IsHash('sha512')
  passwordHash: string;

  @Column({ type: 'text', name: 'postal_address', })
  postalAddress: string;

  @OneToOne(() => UserHall, (userHall) => userHall.user)
  userHall: UserHall;

  @OneToOne(() => UserRoom, (userRoom) => userRoom.user)
  userRoom: UserRoom;
}
