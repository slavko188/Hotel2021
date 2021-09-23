import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PhotoRoom } from "./photo-room.entity";
import { Photo } from "./photo.entity";
import { RoomFeature } from "./room-feature.entity"; 
import { UserRoom } from "./user-room.entity";
import * as Validator from 'class-validator';

@Index("number_room", ["numberRoom"], { unique: true })
@Entity("room")
export class Room {
  @PrimaryGeneratedColumn({ type: "int", name: "room_id", unsigned: true })
  roomId: number;

  @Column({
    type:"int",
    name: "number_room",
    unique: true,
    unsigned: true,
  
  })
 @Validator.IsNotEmpty()
  @Validator.IsPositive()
 @Validator.IsNumber({
 allowInfinity: false,
   allowNaN: false,
    maxDecimalPlaces: 0,
    })
  numberRoom: number;

  @Column({ name: "type_of_bed", type: "varchar", length: 50 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  typeOfBed: string;

  @Column({
    type:"int",
    name: "number_of_bed",
    unsigned: true,
    
  })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
    })
  numberOfBed: number;

  @Column({ name: "floor", type: "int", unsigned: true })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
    })
  floor: number;

  @OneToMany(() => RoomFeature, (roomFeature) => roomFeature.room)
  roomFeatures: RoomFeature[];

  @OneToOne(() => UserRoom, (userRoom) => userRoom.room)
  userRoom: UserRoom;

  @OneToMany(() => PhotoRoom, (photoRoom) => photoRoom.room)
  photoRoom: PhotoRoom;

  photo: Photo[];
}
