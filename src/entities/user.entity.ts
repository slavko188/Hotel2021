import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserHall } from "./user-hall.entity";
import { UserRoom } from "./user-room.entity";
import Validator from 'class-validator';


@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column({ type: "varchar", name: "forename", length: 64 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2, 64)
  forename: string;

  @Column({ name: "surname", type: "varchar", length: 64 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2, 64)
  surname: string;

  @Column({ type: 'varchar', length: '255', unique: true, })
  @Validator.IsNotEmpty()
  @Validator.IsEmail({
    allow_ip_domain: false,
    allow_utf8_local_part: true,
    require_tld: true, //top level domen .com
   }) 
  email: string;

  @Column({ type: 'varchar', name: 'phone_number', length: '24', unique: true })
  @Validator.IsNotEmpty()
  @Validator.IsPhoneNumber(null)
  phoneNumber: string;

  @Column({
    type: "varchar",
    name: "password_hash",
    length: 128,
  })
    
  @Validator.IsNotEmpty()
  @Validator.IsHash('sha512')
  passwordHash: string;

  @Column({ type: 'text', name: 'postal_address', })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10, 512)
  postalAddress: string;

  @OneToOne(() => UserHall, (userHall) => userHall.user)
  userHall: UserHall;

  @OneToOne(() => UserRoom, (userRoom) => userRoom.user)
  userRoom: UserRoom;
}
